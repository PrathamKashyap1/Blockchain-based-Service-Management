var contract;

function handleServiceClick(name, ownerAddress, availableTill, link) {
    console.log("entered");
    if ("0x5ecc6fda203598bfc8a48274ac2965859acaed4f".toLowerCase() === ownerAddress.toLowerCase()) {
        if (name == "Text-Editor" || Date.now() < availableTill || true) {
            console.log("Date " + Date.now() + " name " + name + "available  " + availableTill);
            window.open(`${link}`);
        }
    } else {
        alert('You do not have access to this service. Please buy it.');
    }
}

async function handleBuyClick(name, ownerAddress, availableTill) {
    if (Date.now() < availableTill) {
        try {
            const result = await contract.registerForService().send({
                from: web3.eth.defaultAccount,
                value: web3.utils.toWei('0.001', 'ether')
            });
            alert('Service purchased successfully!');
            fetchServices(contract);
        } catch (error) {
            console.error('Error buying service:', error);
            alert('Error buying service. Please try again later.');
        }
    } else {
        alert('This service is no longer available.');
    }
}

async function fetchServices(contract) {
    const servicesListElement = document.getElementById('servicesList');
    servicesListElement.innerHTML = ''; 
    const services = await contract.getAvailable();
    
    services.forEach((service, index) => {
        const { serviceId, name, ownerAddress, timeDuration, availableTill, isFree, serviceLink } = service;
        const backgroundColor = `hsl(${index * 30}, 70%, 80%)`;

        const listItem = document.createElement('div');
        listItem.style.padding = '1px';
        listItem.style.borderRadius = '10px';
        listItem.style.marginBottom = '20px';

        listItem.innerHTML = `
            <div class="card" style="width: 95%; max-width: 1400px; margin: 20px auto; background-color: ${backgroundColor}; border-radius: 10px; box-shadow: 1px 2px 3px black; overflow: hidden;">
                <div class="image" style="width: 40%; height: 260px; background-image: url('https://source.unsplash.com/featured/?${name}'); background-size: cover; background-position: center; float: left;"></div>
                <div class="content" style="padding: 20px; overflow: hidden;">
                    <h2 style="margin-top: 0;">Name: ${name}</h2>
                    <p>Owner: ${ownerAddress}</p>
                    <p>Booked Till: ${new Date(availableTill * 1000)}</p>
                    <div class="toggle-button-container">
                        <input type="checkbox" class="toggle-button" id="toggle-${serviceId}" onchange="handleUpvoteClick(this, 'count-${serviceId}', '${name}')">
                        <label for="toggle-${serviceId}">
                            <i class="fas fa-arrow-up"></i>
                        </label>
                    </div>
                    <p id="count-${serviceId}" style="padding-left: 2px; font-family: sans-serif;">0</p>
                    <div class="buttons" style="margin-top: 20px; text-align: right;">
                        <button class="buy-btn" style="display: ${isFree ? 'none' : 'inline-block'}; padding: 8px 16px; border: none; border-radius: 4px; margin-left: 10px; cursor: pointer; background-color: #007bff; color: #fff;" onclick="handleBuyClick('${name}', '${ownerAddress}', ${availableTill})">Buy Service</button>
                        <button class="open-btn" style="display: ${isFree ? 'inline-block' : 'none'}; padding: 8px 16px; border: none; border-radius: 4px; margin-left: 10px; cursor: pointer; background-color: #007bff; color: #fff;" onclick="handleServiceClick('${name}', '${ownerAddress}', ${availableTill}, '${serviceLink}')">Open</button>
                        <button class="unregister-btn" style="display: ${isFree ? 'inline-block' : 'none'}; padding: 8px 16px; border: none; border-radius: 4px; margin-left: 10px; cursor: pointer; background-color: #007bff; color: #fff;" onclick="unregister(${serviceId})">Unregister</button>
                    </div>
                </div>
            </div>
        `;
        servicesListElement.appendChild(listItem);
    });

    // Load upvote status from localStorage
    services.forEach((service) => {
        const { serviceId, name } = service;
        const upvoteStatus = localStorage.getItem(name) === 'true';
        const toggleButton = document.getElementById(`toggle-${serviceId}`);
        const countElement = document.getElementById(`count-${serviceId}`);
        
        if (upvoteStatus) {
            toggleButton.checked = true;
            countElement.textContent = parseInt(countElement.textContent) + 1;
        }
    });
}

async function handleAddServiceClick(contract) {
    if (!window.ethereum || !window.web3) {
        alert("You need to connect to metamask to add services. You can now access only free services");
        return;
    }

    try {
        await window.ethereum.enable();

        const name = prompt('Enter service name:');
        if (name == "" || name == null) {
            alert("Please enter a valid name");
            return;
        }
        const timeDuration = parseInt(prompt('Enter service duration (in seconds):'));
        const link = prompt("Enter your deployed service link/address");

        const servicesList = await contract.getAvailable();
        const length = servicesList.length + 1;

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const fromAddress = accounts[0];
        const contractWithSigner = contract.connect(fromAddress);
        const result = await contractWithSigner.newService(length, name, timeDuration, link);

        alert('Service added successfully!');
        fetchServices(contract);
    } catch (error) {
        console.error('Error adding new service:', error);
        alert('Error adding new service. Please try again later.');
    }
}

window.addEventListener('load', async () => {
    const contractAbi = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "timeDuration",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "serviceLink",
                    "type": "string"
                }
            ],
            "name": "newService",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
            },
            {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "registerForService",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
            },
            {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "unregister",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
            },
            {
            "inputs": [],
            "name": "getAvailable",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "serviceId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "ownerAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timeDuration",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "availableTill",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isFree",
                            "type": "bool"
                        },
                        {
                            "internalType": "string",
                            "name": "serviceLink",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct Services.Service[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
            },
            {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "servicesList",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "serviceId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "ownerAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "timeDuration",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "availableTill",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isFree",
                    "type": "bool"
                },
                {
                    "internalType": "string",
                    "name": "serviceLink",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
            }
    ];

    const contractAddress = '0x5fFe734D4B652be0bbA0BABD98C2CB0D21F5f6Cf';

    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractAbi, signer);
    } else if (window.web3) {
        const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        const signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractAbi, signer);
    } else {
        alert('Consider trying metamask to utilize all services.');
        const provider = ethers.getDefaultProvider('https://sepolia.infura.io/v3/61362965c30a462398f4c664a266d13c');
        contract = new ethers.Contract(contractAddress, contractAbi, provider);
    }

    const addServiceButton = document.getElementById('addServiceButton');
    addServiceButton.addEventListener('click', async () => {
        handleAddServiceClick(contract);
    });

    fetchServices(contract);
});

async function unregister(id) {
    try {
        const result = await contract.unregister(id).send({ from: web3.eth.defaultAccount });
        console.log(result);
        console.log("Unregistered");
        fetchServices(contract);
    } catch (error) {
        console.error('Error unregistering:', error);
    }
}

function handleUpvoteClick(checkbox, counterId, serviceName) {
    const counter = document.getElementById(counterId);
    if (checkbox.checked) {
        counter.innerText = parseInt(counter.innerText) + 1;
        localStorage.setItem(serviceName, 'true');
    } else {
        counter.innerText = parseInt(counter.innerText) - 1;
        localStorage.setItem(serviceName, 'false');
    }
}
