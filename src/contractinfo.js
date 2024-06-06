   
export const contractAbi = [
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
    
    export const contractAddress = '0x5fFe734D4B652be0bbA0BABD98C2CB0D21F5f6Cf';
   