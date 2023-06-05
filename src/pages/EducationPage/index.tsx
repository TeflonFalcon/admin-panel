import React, { useEffect, useMemo, useState } from 'react'
import useDebounce from '@/hooks/useDebounce'
import useAppSelector from '@/hooks/useAppSelector'
import { selectLessonsList } from '@/store/selectors/main'
import useAppDispatch from '@/hooks/useAppDispatch'
import useFetching from '@/hooks/useFetching'
import { IPaginationRequest } from '@/types'
import { getPaginateLessons } from '@/store/actions/main'
import {
  Button,
  CircularProgress,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import LessonStatusChanger from '@/components/LessonStatusChanger'
import { lessonStatusChipFormat } from '@/helpers/lessonStatusFormat'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search)
  const [page, setPage] = useState(1)
  const [limit] = useState(5)

  const { lessons, total } = useAppSelector(selectLessonsList)
  const dispatch = useAppDispatch()
  const [fetchLessons, isLoading] = useFetching(async (data: IPaginationRequest) => {
    await dispatch(getPaginateLessons(data))
  })

  useEffect(() => {
    fetchLessons({ _page: page, _limit: limit, title: searchDebounce ? searchDebounce : undefined })
  }, [page, limit, searchDebounce])

  const rows = useMemo(
    () =>
      isLoading ? (
        <TableRow>
          <CircularProgress size={10} />
        </TableRow>
      ) : (
        lessons.map(({ id, user, title, status }, index) => (
          <TableRow key={id}>
            <TableCell>{index + 1 + (page - 1) * limit}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{lessonStatusChipFormat(status)}</TableCell>
            <TableCell>
              <LessonStatusChanger id={id} status={status} />
            </TableCell>
          </TableRow>
        ))
      ),
    [isLoading, lessons, page, limit],
  )
  return (
    <Stack gap='10px'>
      <Typography variant='h4'>Уроки</Typography>

      <Stack direction='row' justifyContent='space-between'>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={(event, newPage) => setPage(newPage)}
        />
        <Stack direction='row' gap='10px'>
          <TextField
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder='Поиск...'
            InputProps={{ endAdornment: <Search /> }}
          />
          <Button onClick={() => navigate('/education/create')} variant='outlined' color='error'>
            Добавить
          </Button>
        </Stack>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Пользователь</TableCell>
              <TableCell>Урок</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}

export default Index
