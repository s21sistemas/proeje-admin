import { useQuery } from '@tanstack/react-query'
import { getReportesSupervisor } from '../api/reportes-supervisor'
import { useEffect } from 'react'

export const useReportesSupervisor = () => {
  const query = useQuery({
    queryKey: ['reportes-supervisor'],
    queryFn: async () => {
      const { data, unsubscribe } = await getReportesSupervisor()
      return { data, unsubscribe }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: false
  })

  useEffect(() => {
    let unsubscribe = null

    getReportesSupervisor().then(({ unsubscribe: unsub }) => {
      query.refetch()
      unsubscribe = unsub
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  return {
    data: query.data?.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error
  }
}
