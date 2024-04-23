pragma solidity >=0.6.10 <0.9.0;

contract Services {
    struct Service {
        uint serviceId;
        string name;
        address ownerAddress;
        uint timeDuration;
        uint availableTill;
        bool isFree;
        string serviceLink; // New field for service link
    }

    Service[] public servicesList;

    mapping (uint => address) private serviceToUser;

    function getAvailable() external view returns (uint[] memory) {
        uint[] memory arr;
        for (uint i = 0; i < servicesList.length; i++) {
            if (servicesList[i].isFree) {
                arr[i] = i;
            }
        }
        return arr;
    }

    function newService(uint id, string memory name, uint timeDuration, string memory serviceLink) external {
        Service memory s = Service(servicesList.length, name, msg.sender, timeDuration, 0, true, serviceLink);
        servicesList.push(s);
        serviceToUser[id] = msg.sender;
    }

    function registerForService(uint _id) external payable {
        require(msg.value >= 0.001 ether);
        serviceToUser[_id] = msg.sender;
        if (servicesList[_id].isFree) {
            servicesList[_id].availableTill = block.timestamp + servicesList[_id].timeDuration;
            serviceToUser[_id] = msg.sender;
            servicesList[_id].isFree = false;
        }
    }

    function unregister(uint _id) external {
        require(serviceToUser[_id] == msg.sender);
        for (uint i = 0; i < servicesList.length; i++) {
            if (servicesList[i].serviceId == _id && servicesList[i].availableTill > block.timestamp) {
                uint availableTill = servicesList[i].availableTill;
                serviceToUser[_id] = address(0);
                uint percentage = 1 - (availableTill - block.timestamp) / availableTill;
                payable(msg.sender).transfer(percentage * 0.01 ether);
            }
        }
    }
}
