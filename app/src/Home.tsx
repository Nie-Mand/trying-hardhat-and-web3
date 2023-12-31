import { useWallet, useContract } from 'eth'
import { useState, useEffect } from 'react'
import { abi } from './abi/IdentityIssuer.json'

// LOADING, SEPERATE THE TRANSACTION EACH
export default function Home() {
  const [v, setV] = useState('')
  // const [h, setH] = useState<>('')

  const { account, blockNumber, balance, network, symbol } = useWallet()
  const { contract, call, error, history } = useContract(
    '0x316A7ef8BE508CC4eE1f2ccb63Af8f316CD63Bb0',
    abi
  )

  async function whoami() {
    const me = await call(contract!.whoami)
    console.log('me', me)
  }

  async function register() {
    const registered = await call(contract!.register, { name: v })
    console.log('registered', registered)
  }

  useEffect(() => {
    contract?.on('IdentityRegistered', (_user: string, _identity: string) => {
      console.log('IdentityRegistered', _user, _identity)
    })
  }, [contract])

  return (
    <div>
      <h1>hi, {account}</h1>
      <h2>block number: {blockNumber}</h2>
      <h2>
        balance: {balance} {symbol}
      </h2>
      <h2>network: {network}</h2>

      <div className="block border p-4">
        <input
          type="text"
          value={v}
          onChange={e => setV(e.target.value)}
          className="border"
        />
        <button onClick={register}>register</button>
      </div>

      <button onClick={whoami}>lookup me</button>

      <div className="text-red-500">{error}</div>
      <button onClick={whoami}>refresh history</button>
    </div>
  )
}
