import { useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Component
import Spinner from 'src/@core/components/spinner'

const Home = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/catalog')
    }, [router])

    return <Spinner />
}

export default Home
