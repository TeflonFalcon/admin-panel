import React, { useEffect, useState } from 'react'
import {
  CircularProgress,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from '@mui/material'
import useAppSelector from '@/hooks/useAppSelector'
import { selectComplaintsList } from '@/store/selectors/main'
import { Search } from '@mui/icons-material'
import useFetching from '@/hooks/useFetching'
import { getPaginateComplaints } from '@/store/actions/main'
import useAppDispatch from '@/hooks/useAppDispatch'
import { IPaginationRequest } from '@/types'
import dayjs from 'dayjs'
import ComplaintStatusChanger from '@/components/ComplaintStatusChanger'
import useDebounce from '@/hooks/useDebounce'

const Index = () => {
  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search)
  const [page, setPage] = useState(1)
  const [limit] = useState(5)
  const [sortByDate, setSortByDate] = useState<'asc' | 'desc' | undefined>()
  const handleChangeSort = () =>
    setSortByDate((prevState) => (prevState !== 'desc' ? 'desc' : 'asc'))

  const { complaints, total } = useAppSelector(selectComplaintsList)
  const dispatch = useAppDispatch()
  const [fetchComplaints, isLoading] = useFetching(async (data: IPaginationRequest) => {
    await dispatch(getPaginateComplaints(data))
  })

  useEffect(() => {
    fetchComplaints({
      _page: page,
      _limit: limit,
      _order: sortByDate,
      name: searchDebounce ? searchDebounce : undefined,
    })
  }, [page, limit, sortByDate, searchDebounce])
  return (
    <Stack gap='10px'>
      <Typography variant='h4'>Предложения пользователей</Typography>

      <Stack direction='row' justifyContent='space-between'>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={(event, newPage) => setPage(newPage)}
        />
        <TextField
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder='Поиск...'
          InputProps={{ endAdornment: <Search /> }}
        />
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Пользователь</TableCell>
              <TableCell>Тема</TableCell>
              <TableCell>Сообщение</TableCell>
              <TableCell>
                <TableSortLabel
                  direction={sortByDate}
                  active={!!sortByDate}
                  onClick={handleChangeSort}
                >
                  Дата
                </TableSortLabel>
              </TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <CircularProgress size={10} />
              </TableRow>
            ) : (
              complaints.map(({ id, name, status, description, subject, createdAt }, index) => (
                <TableRow key={id}>
                  <TableCell>{index + 1 + (page - 1) * limit}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{subject}</TableCell>
                  <TableCell sx={{ maxWidth: '150px' }}>{description.substring(100, -1)}</TableCell>
                  <TableCell>{dayjs(createdAt).format('DD/MM/YYYY, hh:mm:ss')}</TableCell>
                  <TableCell>
                    <ComplaintStatusChanger status={status} id={id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default Index
