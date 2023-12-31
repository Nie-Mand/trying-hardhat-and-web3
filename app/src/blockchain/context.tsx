import React, { createContext, useContext, ReactNode, useMemo } from 'react'
import { useMetamask } from './use-metamask'

interface IContext {
  wallet: any
  loading: boolean
  error: string | null
}

const Context = createContext<IContext>({
  wallet: null,
  loading: true,
  error: null,
})

export function Provider({ children }: { children: ReactNode }) {
  const { error, loading, wallet } = useMetamask()

  const value = useMemo(() => {
    return {
      error,
      loading,
      wallet,
    }
  }, [wallet, error, loading])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useWalletContext() {
  return useContext(Context)
}
