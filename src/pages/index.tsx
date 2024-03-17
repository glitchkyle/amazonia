import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/catalog')
  }, [router])

  return <>Home</>
}

export default Home
