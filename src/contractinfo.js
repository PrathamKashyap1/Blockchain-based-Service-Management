   
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
   


    new newcontractAbi =  [
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

    newcontractAddresss = '0x4f92effe2c63b2a733dde33b133a87b60c78c785';