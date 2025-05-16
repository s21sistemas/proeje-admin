import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getBitacoras } from '../api/bitacoras'

export const useBitacoras = () => {
  const query = useQuery({
    queryKey: ['bitacoras'],
    queryFn: async () => {
      const { data, unsubscribe } = await getBitacoras()
      return { data, unsubscribe }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: false
  })

  useEffect(() => {
    let unsubscribe = null

    getBitacoras().then(({ unsubscribe: unsub }) => {
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
