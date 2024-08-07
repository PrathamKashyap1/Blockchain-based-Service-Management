var contract;

async function handleServiceClick(rentowner,rentedTill, serviceLink) {

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const msgsender = accounts[0];
    if(rentedTill > Date.now() && rentowner.toLowerCase() == msgsender.toLowerCase()){
    let timelimit = btoa('temp');//finish this
    window.open(serviceLink+"?data="+timelimit);
    }

}

async function handleBuyClick(serviceId,rentedTill) {
    if (Date.now() > rentedTill*1000) {
        try {
            //send eth from user wallet to contract
            const result = await contract.registerForService(serviceId,{
                value: ethers.utils.parseEther('0.001')
            });
            alert('Service purchased successfully!');
            console.log(result);
            fetchServices(contract);
        }
        catch (error) {
            console.error('Error buying service:', error);
            alert('Error buying service. Please try again later.');
        }
    }
    else {
        alert('This service is already booked by someone.');
    }
}

async function fetchServices(contract) {
    const apiKey = 'tmkU6YF1Jb5Ht0myqe0RTSz7DWDPggdDfJjvebX1HHyS5On2fMw83WAd';
    const servicesListElement = document.getElementById('servicesList');
    servicesListElement.innerHTML = ''; 
    const services = await contract.getAvailable();
    console.log(services);
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    const msgsender = accounts[0];

    services.forEach((service, index) => {
        const { serviceId,name,description,ownerAddress,rentowner,timeDuration,rentedTill,upvotecount, isFreeService,serviceLink, extrafield } = service;
        const backgroundColor = `hsl(${index * 30}, 70%, 80%)`;
        console.log(serviceId);

        let imageUrl;
        const apiUrl = `https://api.pexels.com/v1/search?query=${name}&per_page=1`;

        fetch(apiUrl, {
            headers: {
                Authorization: apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.photos && data.photos.length > 0) {
                imageUrl = data.photos[0].src.landscape;
                console.log(imageUrl);
            }
        

        let td = Number(rentedTill) *1000;
        console.log(Number(rentedTill));

        let datecalculated = td > Date.now() ? new Date(td) : "<div style='color:red;'>Currently Free</div>";


        console.log(name+" "+new Date(td));
        console.log("checking msgsender "+typeof msgsender + " and rent owner is "+typeof rentowner);

        if(true){
        const listItem = document.createElement('div');
        listItem.style.padding = '1px';
        listItem.style.borderRadius = '10px';
        listItem.style.marginBottom = '10px';

        listItem.innerHTML = `
        <div class="card" style="width: 95%; max-width: 1200px; margin: 10px auto; background-color: ${backgroundColor}; border-radius: 10px; box-shadow: 1px 2px 3px black; overflow: hidden;">
            <div class="image" style="width: 40%; height: 320px; background-image: url(${imageUrl}); background-size: cover; background-position: center; float: left;"></div>
            <div class="content" style="padding: 10px; overflow: hidden;">
                <h2 style="margin-top: 0; line-height: 1.2;">Name: ${name}</h2>
                <p style="margin: 5px 0;">${description}</p>
                <p style="margin: 0px 0;color:black;font-size:15px;">Owner: ${ownerAddress}</p>
                <div style="margin: 5px 0; display:flex;">Booked Till: ${datecalculated}</div>
                <div style="display: flex; align-items: center; margin-top: 5px;">
                    <div class="toggle-button-container" style="width: 67px;">
                        <input type="checkbox" class="toggle-button" id="toggle-${serviceId}" onchange="handleUpvoteClick(this, 'count-${serviceId}', '${name}', ${upvotecount})">
                        <label for="toggle-${serviceId}">
                            <i class="fas fa-arrow-up"></i>
                        </label>
                    </div>
                    <p id="count-${serviceId}" style="padding-left: 5px; font-family: sans-serif;">${upvotecount}</p>
                </div>
                <div class="buttons" style="margin-top: 10px; text-align: right;">
                    <button class="buy-btn" style="display: ${isFreeService ? 'none' : (rentedTill != 0 ? 'none' : 'inline-block')}; padding: 5px 10px; border: none; border-radius: 4px; margin-left: 5px; cursor: pointer; background-color: #007bff; color: #fff;" onclick="handleBuyClick(${serviceId}, ${rentedTill})">Buy Service</button>


                    <button class="open-btn" style="display: ${isFreeService ? 'inline-block' : (rentowner.toLowerCase() == msgsender.toLowerCase()) ? 'inline-block' : 'none'}; padding: 5px 10px; border: none; border-radius: 4px; margin-left: 5px; cursor: pointer; background-color: #007bff; color: #fff;" onclick="handleServiceClick('${rentowner}', ${td}, '${serviceLink}')">Open</button>


                    <button class="unregister-btn" style="display: ${isFreeService ? 'none' : (rentowner.toLowerCase() == msgsender.toLowerCase()) ? 'inline-block' : 'none'}; padding: 5px 10px; border: none; border-radius: 4px; margin-left: 5px; cursor: pointer; background-color: #007bff; color: #fff;" onclick="unregister(${serviceId})">Unregister</button>
                    
                    <button class="delete-btn" style="display: ${isFreeService ? 'none' : (ownerAddress.toLowerCase() == msgsender.toLowerCase()) ? 'inline-block' : 'none'}; padding: 5px 10px; border: none; border-radius: 4px; margin-left: 5px; cursor: pointer; background-color: #007bff; color: #fff;" onclick="deleteservice(${serviceId})">Delete Service</button>
                </div>
            </div>
        </div>
    `;
        servicesListElement.appendChild(listItem);}
    });
});

    // Load upvote status from localStorage
    services.forEach((service) => {
        const { serviceId, name } = service;
        const upvoteStatus = localStorage.getItem(name+"ss") === 'true';
        if(upvoteStatus=== 'false') 
         upvoteStatus = localStorage.getItem(name) === 'true';
        
        const toggleButton = document.getElementById(`toggle-${serviceId}`);
        const countElement = document.getElementById(`count-${serviceId}`);
        console.log(upvoteStatus+ typeof upvoteStatus);
        if (upvoteStatus) {
            let upbutton = document.getElementById(`count-${serviceId}`);
            upbutton.innerText = parseInt(upbutton.innerText) + 1;
            toggleButton.checked = true;
            localStorage.setItem(name+"ss",true);
            localStorage.setItem(name,true);
        }
    });
}

async function handleAddServiceClick(contract) {
    if (!window.ethereum || !window.web3) {
        //if user doesn't have account
        alert("You need to connect to metamask to add services. You can now access only free services");
        return;
    }

    try {
        await window.ethereum.enable();
        //Taking details about the service
        const name = prompt('Enter service name:');
        if (name == "" || name == null) {
            alert("Please enter a valid name");
            return;
        }

        //taking time till a service should be valid
        const timeDuration = parseFloat(prompt('Enter no. of days the service will be assigned to the customer:')) * 86400;
        console.log(timeDuration);
        const isFreeservice = confirm("Click Ok if you want your service to be Freely Usable by all or click cancel if you want to charge each user of your service?");

        const link = prompt("Enter your deployed service link/address");

        const desc = prompt("Describe your service in a sentence or two?");

        if(link==""||desc==""||timeDuration==0){
            alert("No field should be empty");
            return;
        }
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const fromAddress = accounts[0];
        //calling add service function with new signer
        const result = await contract.newService( name,desc,timeDuration,isFreeservice, link," ");

        alert('Service added successfully!');
        fetchServices(contract);
    } catch (error) {
        //handling failed payments
        console.error('Error adding new service:', error);
        alert('Error adding new service. Please try again later.');
    }
}



async function unregister(id) {
    try {
        //unregister method present in our smart contract
        const result = await contract.unregister(id);
        console.log(result);
        console.log("Unregistered");
        fetchServices(contract);
    } catch (error) {
        console.error('Error unregistering:', error);
    }
}


async function deleteservice(id) {
    try {
        //delete method present in our smart contract
        const result = await contract.deleteservice(id);
        console.log(result);
        alert("Service Deleted successfully");
        fetchServices(contract);
    } catch (error) {
        console.error('Error deleting service:', error);
    }
}

function handleUpvoteClick(checkbox, counterId, serviceName,upvotecount) {
    const counter = document.getElementById(counterId);
    if (checkbox.checked) {
        //if user already upvoted changing its style to upvoted
        counter.innerText = parseInt(counter.innerText) + 1;
        localStorage.setItem(serviceName+"ss", 'true');
    } else {
        counter.innerText = parseInt(counter.innerText) - 1;
        localStorage.setItem(serviceName+"ss", 'false');
    }
}




window.addEventListener('load', async () => {
    const contractAbi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "serviceId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "rentowner",
                    "type": "address"
                }
            ],
            "name": "ServiceRegistered",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "serviceId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "refundAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "ownerpayamount",
                    "type": "uint256"
                }
            ],
            "name": "ServiceUnregistered",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "payeeaddress",
                    "type": "address"
                }
            ],
            "name": "paid",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_index",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_newdata",
                    "type": "string"
                }
            ],
            "name": "changeExtra",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256[]",
                    "name": "upvotesarr",
                    "type": "uint256[]"
                }
            ],
            "name": "changeUpvotes",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "deleteservice",
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
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "address",
                            "name": "ownerAddress",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "rentowner",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timeDuration",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "rentedTill",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "upvotecount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isFreeService",
                            "type": "bool"
                        },
                        {
                            "internalType": "string",
                            "name": "serviceLink",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "extrafield",
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
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "timeDuration",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isFreeservice",
                    "type": "bool"
                },
                {
                    "internalType": "string",
                    "name": "serviceLink",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "extrafield",
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
                    "name": "_index",
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
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "ownerAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "rentowner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "timeDuration",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "rentedTill",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "upvotecount",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isFreeService",
                    "type": "bool"
                },
                {
                    "internalType": "string",
                    "name": "serviceLink",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "extrafield",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "unregister",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ];

    const contractAddress = '0x9cca183f568ef60e4dabd7fa8778206400519079';

    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        alert("metamask connected");
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
