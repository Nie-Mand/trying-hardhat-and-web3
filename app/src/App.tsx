import { useWallet } from 'eth'
import Home from './Home'

export default function App() {
  const { loading, error } = useWallet()

  if (loading)
    return (
      <div>
        <h1>wait</h1>
      </div>
    )

  if (error)
    return (
      <div>
        <h1>{error}</h1>
      </div>
    )

  return <Home />
}
