import { useQuery } from '@tanstack/react-query'
import { getReportesIncidentes } from '../api/incidentes'
import { useEffect } from 'react'

export const useIncidentes = () => {
  const query = useQuery({
    queryKey: ['incidentes'],
    queryFn: async () => {
      const { data, unsubscribe } = await getReportesIncidentes()
      return { data, unsubscribe }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: false
  })

  useEffect(() => {
    let unsubscribe = null

    getReportesIncidentes().then(({ unsubscribe: unsub }) => {
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
