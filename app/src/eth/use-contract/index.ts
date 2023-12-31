import { ethers, Transaction } from 'ethers'
import { useWeb3Context } from '../provider'
import { useState, useEffect, useCallback } from 'react'

export function useContract(address: string, abi: ethers.ContractInterface) {
  const { web3, signer } = useWeb3Context()
  const [error, setError] = useState<string | null>(null)
  const [controller, setController] = useState<ethers.Contract | null>(null)

  async function initContract() {
    let contract = new ethers.Contract(address, abi, web3!)

    if (signer) {
      contract = await contract.connect(signer)
    }
    setController(contract)
  }

  useEffect(() => {
    if (web3) {
      initContract()
    } else {
      if (!web3) setController(null)
    }
  }, [web3, signer])

  const exec = useCallback(
    async <F>(func: (...args: any[]) => Promise<F>, ...args: any[]) => {
      const v = await func(...args).catch((e: any) => {
        console.log()
        setError(null)
        if (e.errorArgs?.length) setError(e.errorArgs)
        else if (
          e.error?.data?.message &&
          e.error.data.message.indexOf(':') !== -1
        )
          setError(e.error.data.message.split(':')[1].trim())
      })

      return v
    },
    []
  )

  const history = useCallback(
    (event: string, ...args: any[]) => {
      return controller!.filters[event](...args)
    },
    [controller]
  )

  return {
    error,
    call: exec,
    contract: controller,
    history,
  }
}
