import React, { useEffect } from 'react'
import {
  Chip,
  Drawer,
  List,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  styled,
} from '@mui/material'
import navigationList from '@/constants/NavigationList'
import { useLocation, useNavigate } from 'react-router-dom'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import useFetching from '@/hooks/useFetching'
import { selectComplaintsList } from '@/store/selectors/main'
import { getPaginateComplaints } from '@/store/actions/main'

const Index = () => {
  const dispatch = useAppDispatch()
  const complaints = useAppSelector(selectComplaintsList)

  const navigate = useNavigate()
  const location = useLocation()

  const [fetchComplaints, isLoading] = useFetching(() => {
    dispatch(getPaginateComplaints({ _page: 1, _limit: 1 }))
  })

  useEffect(() => {
    fetchComplaints()
  }, [])
  return (
    <LeftDrawer variant='permanent'>
      <List component='nav'>
        {navigationList.map(({ label, path }) => (
          <ListItemButton
            key={label}
            selected={location.pathname.includes(path)}
            onClick={() => navigate(path)}
          >
            <ListItemText primary={label} />
            {label === 'Жалобы' && (
              <ListItemSecondaryAction>
                <Chip label={isLoading ? 0 : complaints.total} />
              </ListItemSecondaryAction>
            )}
          </ListItemButton>
        ))}
      </List>
    </LeftDrawer>
  )
}

export default Index

const LeftDrawer = styled(Drawer)`
  position: relative;
  width: 240px;
  height: 100%;
  & .MuiDrawer-paper {
    position: absolute;
    transition: none !important;
    width: 240px;
    height: 100%;
  }
`
