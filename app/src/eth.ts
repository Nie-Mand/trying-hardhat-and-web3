import { useState, useEffect } from 'react'
import { ethers, Signer } from 'ethers'

export const useWalletConnect = () => {
  const [blockNumber, setBlockNumber] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [web3, setWeb3] = useState<ethers.providers.Web3Provider | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [signer, setSigner] = useState<Signer | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [balance, setBalance] = useState<number | null>(null)

  function connectToMetamask() {
    setLoading(true)
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setWeb3(provider)
      setError(null)
    } else {
      setError('Wallet is not installed or not enabled in this webpage')
      setLoading(false)
    }
  }

  async function initialSetup() {
    setBlockNumber(await web3!.getBlockNumber())
    const [account] = await web3!.send('eth_requestAccounts', [])
    setAccount(account)
    setSigner(web3!.getSigner())
    const _balance = await web3!.getBalance(account)
    setBalance(Number(ethers.utils.formatEther(_balance)))
    setLoading(false)
  }

  useEffect(() => {
    connectToMetamask()
  }, [])

  useEffect(() => {
    if (web3) {
      initialSetup()
    }
  }, [web3])

  //   useEffect(() => {
  //     if (web3) {
  //       web3.on('')
  //     }
  //   }, [])

  return {
    signer,
    account,
    web3,
    loading,
    error,
    balance,
    blockNumber,
  }
}
