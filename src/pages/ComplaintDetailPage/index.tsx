import React, { useEffect } from 'react'
import { CircularProgress, Stack, Typography } from '@mui/material'
import useAppSelector from '@/hooks/useAppSelector'
import { selectComplaint } from '@/store/selectors/main'
import useFetching from '@/hooks/useFetching'
import useAppDispatch from '@/hooks/useAppDispatch'
import { getComplaint } from '@/store/actions/main'
import { useParams } from 'react-router-dom'
import DetailComplaint from '@/components/DetailComplaint'

const Index = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const complaint = useAppSelector(selectComplaint)

  const [fetchComplaint, isLoading] = useFetching(async (id: string) => {
    dispatch(getComplaint(id))
  })

  useEffect(() => {
    fetchComplaint(id)
  }, [id])
  if (isLoading || !complaint) return <CircularProgress />
  return (
    <Stack gap='20px' maxWidth='50%'>
      <Typography variant='h4'>Жалобы</Typography>
      <DetailComplaint complaint={complaint} />
    </Stack>
  )
}

export default Index
