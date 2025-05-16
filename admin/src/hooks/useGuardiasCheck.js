import { useQuery } from '@tanstack/react-query'
import { getGuardiasCheck } from '../api/guardias-check'
import { useEffect } from 'react'

export const useGuardiasCheck = () => {
  const query = useQuery({
    queryKey: ['guardias-check'],
    queryFn: async () => {
      const { data, unsubscribe } = await getGuardiasCheck()
      return { data, unsubscribe }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: false
  })

  useEffect(() => {
    let unsubscribe = null

    getGuardiasCheck().then(({ unsubscribe: unsub }) => {
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
