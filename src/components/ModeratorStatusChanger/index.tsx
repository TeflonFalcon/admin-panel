import React from 'react'
import { Button, FormControlLabel, Menu, MenuItem, Radio, RadioGroup } from '@mui/material'
import { ENUM_USER_STATUS } from '@/types'
import useFetching from '@/hooks/useFetching'
import useAppDispatch from '@/hooks/useAppDispatch'
import { changeUserStatus } from '@/store/actions/main'
import { userStatus } from '@/helpers/userStatusFormat'

interface ModeratorStatusChangerProps {
  status: ENUM_USER_STATUS
  id: string
}

const Index: React.FC<ModeratorStatusChangerProps> = ({ status, id }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const dispatch = useAppDispatch()
  const [changeStatus] = useFetching(async (id: string, status: ENUM_USER_STATUS) => {
    dispatch(changeUserStatus({ id, status }))
  })

  const handleChangeStatus = (newStatus: string) => changeStatus(id, newStatus)
  return (
    <React.Fragment>
      <Button onClick={handleClick} variant='outlined' color='error'>
        Выберите статус
      </Button>
      <Menu open={openMenu} anchorEl={anchorEl} onClose={handleClose}>
        <RadioGroup value={status} onChange={(event, newValue) => handleChangeStatus(newValue)}>
          {Object.entries(userStatus).map(([key, label]) => (
            <MenuItem key={key}>
              <FormControlLabel control={<Radio />} label={label} value={key} />
            </MenuItem>
          ))}
        </RadioGroup>
      </Menu>
    </React.Fragment>
  )
}

export default Index
