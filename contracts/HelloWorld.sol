// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import 'hardhat/console.sol';

contract HelloWorld {
    function hello() public view returns (int256) {
        console.log('Hello, world!');
        return 69;
    }
}
