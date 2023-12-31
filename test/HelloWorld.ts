import { expect } from 'chai'
import { ethers } from 'hardhat'

// test suite
describe('HelloWorld works', () => {
  it('hello() works', async () => {
    // GET THE CONTRACT
    const contract = await ethers.getContractFactory('HelloWorld')

    // DEPLOY THE CONTRACT
    const app = await contract.deploy()

    // RUN IT
    const hello = await app.hello()

    expect(hello).to.equal('Hello')
  })

  it('world() works', async () => {
    // GET THE CONTRACT
    const contract = await ethers.getContractFactory('HelloWorld')

    // DEPLOY THE CONTRACT
    const app = await contract.deploy()

    // RUN IT
    const world = await app.world()

    expect(world).to.equal('World')
  })

  it('hello() & world() work', async () => {
    // GET THE CONTRACT
    const contract = await ethers.getContractFactory('HelloWorld')

    // DEPLOY THE CONTRACT
    const app = await contract.deploy()

    // RUN IT
    const hello = await app.hello()
    const world = await app.world()

    expect(hello + ' ' + world).to.equal('Hello World')
  })
})

// smart contract,
// Im gonna test, if HelloWorld Contarct works
// 1. hello() works
// 2. world() works
// 3. hello() + world() works
