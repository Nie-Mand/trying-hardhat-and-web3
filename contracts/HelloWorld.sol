// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract HelloWorld {
    event HiPublished(address indexed sender);

    function hello() public pure returns (string memory) {
        return 'Hello';
    }

    function world() public pure returns (string memory) {
        return 'World';
    }

    function hi() public returns (string memory) {
        emit HiPublished(msg.sender);
        return 'Hi';
    }

    function bonjour() public payable returns (string memory) {
        require(msg.value == 6.9 ether);
        return 'bonjour';
    }
}
