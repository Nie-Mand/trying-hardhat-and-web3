import { ethers } from 'ethers'
import { useEffect } from 'react'
export { Provider, useWalletContext } from './context'
import { useWalletContext } from './context'

export function useContract() {
  const { wallet } = useWalletContext()
  if (!wallet) return

  useEffect(() => {
    const ex = async () => {
      if (!wallet) return
      const address = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
      const provider = new ethers.providers.Web3Provider(wallet)

      const contract = new ethers.Contract(
        address,
        ['function hello() public pure returns (string memory)'],
        provider
      )
      const hello = await contract.hello()

      console.log('hello', hello)
    }

    ex()
  }, [wallet])
}

//   const provider = new ethers.providers.Web3Provider(window.ethereum)
//   const contract = new ethers.Contract(
//     address,
//     ['function hello() public pure returns(string memory)'], // abi
//     provider
//   )

// const ONBOARD_TEXT = 'Click here to install MetaMask!'
// const CONNECT_TEXT = 'Connect'
// const CONNECTED_TEXT = 'Connected'

// export function OnboardingButton() {
//   const [accounts, setAccounts] = useState([])
//   useEffect(() => {
//     if (MetaMaskOnboarding.isMetaMaskInstalled()) {
//       if (accounts.length > 0) {
//         onboarding.current.stopOnboarding()
//       } else {
//         setButtonText(CONNECT_TEXT)
//         setDisabled(false)
//       }
//     }
//   }, [accounts])

//   useEffect(() => {
//     function handleNewAccounts(newAccounts: any) {
//       setAccounts(newAccounts)
//     }
//     if (MetaMaskOnboarding.isMetaMaskInstalled()) {
//       window.ethereum
//         .request({ method: 'eth_requestAccounts' })
//         .then(handleNewAccounts)
//       window.ethereum.on('accountsChanged', handleNewAccounts)
//       return () => {
//         window.ethereum.removeListener('accountsChanged', handleNewAccounts)
//       }
//     }
//   }, [])

//   const onClick = () => {
//     if (MetaMaskOnboarding.isMetaMaskInstalled()) {
//       window.ethereum
//         .request({ method: 'eth_requestAccounts' })
//         .then((newAccounts: any) => setAccounts(newAccounts))
//     } else {
//       onboarding.current.startOnboarding()
//     }
//   }
// }
