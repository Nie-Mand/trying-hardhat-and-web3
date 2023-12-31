import { useState, useEffect, useRef } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'

export function useMetamask() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [wallet, setWallet] = useState<any | null>(null)

  const onboarding = useRef<null | MetaMaskOnboarding>()

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setLoading(false)
      setError(null)
      setWallet(window.ethereum)
    } else {
      setWallet(null)
      setLoading(false)
      setError('Wallet is not installed or not enabled in this webpage')
    }
  }, [])

  return {
    wallet,
    loading,
    error,
  }
}
