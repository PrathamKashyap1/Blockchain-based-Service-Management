var contract;
		
function handleServiceClick(name, ownerAddress, availableTill,link) {

        console.log("entered");
        if ("0x5ecc6fda203598bfc8a48274ac2965859acaed4f".toLowerCase() === ownerAddress.toLowerCase()) {
            //const token = `name+${ownerAddress}`;
                if(name=="Text-Editor" || Date.now()<availableTill || true){
                    console.log("Date "+Date.now() + " name "+name+"avalialbel  "+availableTill);
            window.open(`${link}`);
        }
            
        } else {
            alert('You do not have access to this service. Please buy it.');
        }
    }

    // Function to handle "Buy Service" button click
    async function handleBuyClick(name, ownerAddress, availableTill) {
        // Check if the service is available
        if (Date.now() < availableTill ) {
            try {
                const result = await contract.methods.buyService().send({
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




    async function fetchServices(contract){
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
console.log('Accounts:',accounts);
const fromAddress = accounts[0];
const servicesListElement = document.getElementById('servicesList');
servicesListElement.innerHTML = ''; 
const services = await contract.methods.getAvailable().call();
services.forEach((service, index) => {
const { serviceid, name, ownerAddress, timeduration, availableTill, isFree, serviceLink } = service;

console.log(services);


if(ownerAddress!=0x0000000000000000000000000000000000000000){
    let openbtn,buybtn;
    if(ownerAddress.toLowerCase()==="0x5ecc6fda203598bfc8a48274ac2965859acaed4f"){
        openbtn="inline-block";
        buybtn="none";
    }
    else{
        openbtn="none";
        buybtn="inline-block";
    }
const backgroundColor = `hsl(${index * 30}, 70%, 80%)`;				
const listItem = document.createElement('div');
listItem.style.padding = '1px';
listItem.style.borderRadius = '10px';
// listItem.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
listItem.style.marginBottom = '20px';
listItem.innerHTML = `
<div class="card" style="width: 95%; max-width: 1400px; margin: 20px auto; background-color: ${backgroundColor}; border-radius: 10px; box-shadow: 1px 2px 3px black; overflow: hidden;">
<div class="image" style="width: 40%; height:260px; background-image: url('https://source.unsplash.com/featured/?${name}'); background-size: cover; background-position: center; float: left;"></div>
<div class="content" style="padding: 20px; overflow: hidden;">
<h2 style="margin-top: 0;">Name: ${name}</h2>
<p>Owner : ${ownerAddress}</p>
<p>Booked Till:${Date(timeduration)}</p>
<div class="buttons" style="margin-top: 20px; text-align: right;">
    <button class="buy-btn"  style="display :${buybtn};padding: 8px 16px; border: none; border-radius: 4px; margin-left: 10px; cursor: pointer; background-color: #007bff; color: #fff;">Buy Service</button>
    <button class="open-btn" style=" display:${openbtn};padding: 8px 16px; border: none; border-radius: 4px; margin-left: 10px; cursor: pointer;background-color: #007bff; color: #fff;" onclick="handleServiceClick('${name}','${ownerAddress}','${timeduration}','${serviceLink}');">Open</button>
    <button class="unregister-btn" style="display: ${openbtn}; padding: 8px 16px; border: none; border-radius: 4px; margin-left: 10px; cursor: pointer;background-color: #007bff; color: #fff;" onclick = "unregister(1);">Unregister</button>
</div>
</div>
</div>
`;
servicesListElement.appendChild(listItem);
}});

}



async function handleAddServiceClick(contract) {
    if(!window.ethereum || !window.web3){
        alert("You need to connect to metamask to add services.You can now access only free services");
        }
try {
// Ensure MetaMask is connected and the account is set
await window.ethereum.enable();

const name = prompt('Enter service name:');
if(name=="" ||  name==null){
    alert("Please enter a valid name");
    return;
}
const timeduration = parseInt(prompt('Enter service duration (in seconds):'));
const link = prompt("Enter your deployed service link/address");

let servicesList = await contract.methods.getAvailable().call();
let length = servicesList.length + 1;

// Retrieve the current account from MetaMask
const accounts = await window.ethereum.request({ method: 'eth_accounts' });
const fromAddress = accounts[0];

// Send the transaction with the from address specified
const result = await contract.methods.newService(length, name, timeduration, link).send({ from: fromAddress });

alert('Service added successfully!');

// Reload the list of services after adding a new service
fetchServices(contract);
} catch (error) {
console.error('Error adding new service:', error);
alert('Error adding new service. Please try again later.');
}
}



window.addEventListener('load', async () => {
    // Connect to Web3 and initialize the contract
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

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
    
    
    contract = new web3.eth.Contract(contractAbi, contractAddress);

    
    

    

    // Get the button element
    const addServiceButton = document.getElementById('addServiceButton');

    // Add click event listener to the button
    addServiceButton.addEventListener('click', async () => {
        handleAddServiceClick(contract);
    });

    
    fetchServices(contract);
});


async function unregister(id){
    let unreg = await contract.methods.unregister(id).call();
    console.log(unreg);
    console.log("Unregistered");
}


