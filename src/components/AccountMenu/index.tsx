import React from 'react'
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material'
import { Logout } from '@mui/icons-material'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import useAppDispatch from '@/hooks/useAppDispatch'
import { logoutUser } from '@/store/actions/main'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleLogout = () => dispatch(logoutUser(true))
  const handleCreateComplaint = () => navigate('/complaints/create')
  return (
    <React.Fragment>
      <Tooltip title={'Меню профиля'}>
        <IconButton onClick={handleClick}>
          <Avatar src='/images/avatar.jpg' />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleClose} onClick={handleClose}>
        <MenuItem onClick={handleCreateComplaint}>
          <ListItemIcon>
            <QuestionAnswerIcon color='primary' fontSize='small' />
          </ListItemIcon>
          Подать жалобу
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout color='primary' fontSize='small' />
          </ListItemIcon>
          Выйти из аккаунта
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default Index
