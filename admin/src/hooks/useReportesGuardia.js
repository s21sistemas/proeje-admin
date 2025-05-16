import { useQuery } from '@tanstack/react-query'
import { getReportesGuardia } from '../api/reportes-guardias'
import { useEffect } from 'react'

export const useReportesGuardia = () => {
  const query = useQuery({
    queryKey: ['reportes-guardias'],
    queryFn: async () => {
      const { data, unsubscribe } = await getReportesGuardia()
      return { data, unsubscribe }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: false
  })

  useEffect(() => {
    let unsubscribe = null

    getReportesGuardia().then(({ unsubscribe: unsub }) => {
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
