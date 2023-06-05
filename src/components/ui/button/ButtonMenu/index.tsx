import React from 'react'
import { Button, ButtonProps, Menu, MenuItem } from '@mui/material'

export interface IItemButtonMenu {
  label: string
  onClick?: () => void
}

interface SimpleButtonMenuProps {
  items: IItemButtonMenu[]
}

type ButtonMenuProps = Omit<ButtonProps, 'onClick'> & SimpleButtonMenuProps

const Index: React.FC<ButtonMenuProps> = (props) => {
  const { items } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <React.Fragment>
      <Button {...props} onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
      >
        {items.map(({ label, onClick }) => (
          <MenuItem key={label} onClick={onClick}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )
}

export default Index
