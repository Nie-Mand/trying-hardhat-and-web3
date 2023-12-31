import { ethers } from 'hardhat'

async function deploy() {
  const contract = await ethers.getContractFactory('HelloWorld')
  const deployed = await contract.deploy()
  await deployed.deployed()
  return deployed
}

deploy()
