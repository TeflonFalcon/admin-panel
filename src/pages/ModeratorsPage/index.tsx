import React, { useEffect, useState } from 'react'
import {
  Avatar,
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
import { getPaginateUsers } from '@/store/actions/main'
import useAppSelector from '@/hooks/useAppSelector'
import { selectUsersList } from '@/store/selectors/main'
import useAppDispatch from '@/hooks/useAppDispatch'
import useFetching from '@/hooks/useFetching'
import { IPaginationRequest } from '@/types'
import { Search } from '@mui/icons-material'
import ModeratorStatusChanger from '@/components/ModeratorStatusChanger'
import { userStatusChipFormat } from '@/helpers/userStatusFormat'
import useDebounce from '@/hooks/useDebounce'

const Index = () => {
  const [search, setSearch] = useState('')
  const searchDebounce = useDebounce(search)
  const [page, setPage] = useState(1)
  const [limit] = useState(5)

  const { users, total } = useAppSelector(selectUsersList)
  const dispatch = useAppDispatch()
  const [fetchUsers, isLoading] = useFetching(async (data: IPaginationRequest) => {
    await dispatch(getPaginateUsers(data))
  })

  useEffect(() => {
    fetchUsers({ _page: page, _limit: limit, name: searchDebounce ? searchDebounce : undefined })
  }, [page, limit, searchDebounce])
  return (
    <Stack gap='10px'>
      <Typography variant='h4'>Модераторы</Typography>

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
              <TableCell>Статус</TableCell>
              <TableCell>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <CircularProgress size={10} />
              </TableRow>
            ) : (
              users.map(({ id, name, status, avatar }, index) => (
                <TableRow key={id}>
                  <TableCell>{index + 1 + (page - 1) * limit}</TableCell>
                  <TableCell>
                    <Stack direction='row' alignItems='center' gap='10px'>
                      <Avatar src={avatar} alt={name} />
                      {name}
                    </Stack>
                  </TableCell>
                  <TableCell>{userStatusChipFormat(status)}</TableCell>
                  <TableCell>
                    <ModeratorStatusChanger id={id} status={status} />
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
