import React from 'react'
import complaintStatusFormat, { complaintsStatus } from '@/helpers/complaintStatusFormat'
import { Chip, Divider, FormControlLabel, Menu, MenuItem, Radio, RadioGroup } from '@mui/material'
import { ENUM_COMPLAINT_STATUS } from '@/types'
import useFetching from '@/hooks/useFetching'
import useAppDispatch from '@/hooks/useAppDispatch'
import { changeComplaintStatus } from '@/store/actions/main'
import { useNavigate } from 'react-router-dom'

interface ComplaintStatusChangerProps {
  status: ENUM_COMPLAINT_STATUS
  id: string
}

const Index: React.FC<ComplaintStatusChangerProps> = ({ status, id }) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (status !== ENUM_COMPLAINT_STATUS.answered) setAnchorEl(event.currentTarget)
    else handleAnswer()
  }
  const handleClose = () => setAnchorEl(null)

  const dispatch = useAppDispatch()
  const [changeStatus] = useFetching(async (id: string, status: ENUM_COMPLAINT_STATUS) => {
    dispatch(changeComplaintStatus({ id, status }))
  })

  const handleChangeStatus = (newStatus: string) => changeStatus(id, newStatus)
  const handleAnswer = () => navigate(`/complaints/${id}`)
  return (
    <React.Fragment>
      <Chip onClick={handleClick} label={complaintStatusFormat(status)} />
      <Menu open={openMenu} anchorEl={anchorEl} onClose={handleClose}>
        <RadioGroup value={status} onChange={(event, newValue) => handleChangeStatus(newValue)}>
          {Object.entries(complaintsStatus)
            .filter(([key]) => key !== ENUM_COMPLAINT_STATUS.answered)
            .map(([key, label]) => (
              <MenuItem key={key}>
                <FormControlLabel control={<Radio />} label={label} value={key} />
              </MenuItem>
            ))}
        </RadioGroup>
        {![ENUM_COMPLAINT_STATUS.answered, ENUM_COMPLAINT_STATUS.rejected].includes(status) && (
          <React.Fragment>
            <Divider />
            <MenuItem onClick={handleAnswer}>Ответить</MenuItem>
          </React.Fragment>
        )}
      </Menu>
    </React.Fragment>
  )
}

export default Index
