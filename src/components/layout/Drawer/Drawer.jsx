import { ListItemIcon } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PropTypes from 'prop-types'
import React from 'react'
import { mainMenuListArr, subMenuObj } from '../../../utils/constant'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
})

export default function TemporaryDrawer({
  isShowMenu,
  handleCloseDrawer,
  menuName,
  handleEditMenuName,
}) {
  const classes = useStyles()

  const list = () => {
    const arr = menuName ? subMenuObj[menuName.id] : mainMenuListArr
    const clickListener = (item, e) => {
      e.stopPropagation()
      if (!menuName) {
        return handleEditMenuName(item)
      }
      return 'ok'
    }
    return (
      <div
        className={classes.list}
        role="presentation"
        onKeyDown={handleCloseDrawer}
      >
        <List>
          {arr &&
            arr.map((item, index) => (
              <ListItem
                button
                key={item.id}
                onClick={() => {
                  window.location.href = item.link
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
                {subMenuObj[arr[index].id] !== undefined && !menuName && (
                  <ChevronRightIcon onClick={(e) => clickListener(item, e)} />
                )}
              </ListItem>
            ))}
        </List>
      </div>
    )
  }

  return (
    <div>
      <Drawer open={isShowMenu} onClose={handleCloseDrawer}>
        {menuName && (
          <ListItem button onClick={() => handleEditMenuName(null)}>
            <ListItemText primary="Trở lại menu" />
            <ChevronLeftIcon />
          </ListItem>
        )}
        {list()}
      </Drawer>
    </div>
  )
}
TemporaryDrawer.propTypes = {
  isShowMenu: PropTypes.bool.isRequired,
  handleCloseDrawer: PropTypes.func.isRequired,
  menuName: PropTypes.array.isRequired,
  handleEditMenuName: PropTypes.func.isRequired,
}
