import { useEffect, useState } from 'react'
import { Office } from '../types'

const useOfficesData = () => {
    const [offices, setOffices] = useState<Office[]>([])

    useEffect(() => {
        const fetchPagosData = () => {
          fetch('http://localhost:3001/pagos')
          .then(res => res.json())
          .then(data => setOffices(data.data))
        }
        fetchPagosData()
      },[])
    return {
        offices
    }
  
}

export default useOfficesData