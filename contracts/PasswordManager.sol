// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract PasswordManager {
    struct Password {
        string site;
        string encryptedPassword;
    }

    mapping(address => Password[]) private passwords;

    function addPassword(
        string memory _site,
        string memory _encryptedPassword
    ) public {
        passwords[msg.sender].push(Password(_site, _encryptedPassword));
    }

    function getPasswords() public view returns (Password[] memory) {
        return passwords[msg.sender];
    }

    function updatePassword(
        uint256 _index,
        string memory _newEncryptedPassword
    ) public {
        require(_index < passwords[msg.sender].length, "Invalid index");
        passwords[msg.sender][_index].encryptedPassword = _newEncryptedPassword;
    }

    function deletePassword(uint256 _index) public {
        require(_index < passwords[msg.sender].length, "Invalid index");
        passwords[msg.sender][_index] = passwords[msg.sender][
            passwords[msg.sender].length - 1
        ];
        passwords[msg.sender].pop();
    }
}
