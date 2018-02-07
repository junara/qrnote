import React from 'react'
import {connect} from 'react-redux'

// material-ui
import {withStyles} from 'material-ui/styles';
import {
  Divider,
  MenuItem,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText
} from 'material-ui'
import {
  Today as CalendarIcon,
  MailOutline as MailIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileDownload as FileDownloadIcon,
  Settings as SettingsIcon,
  NoteAdd as NoteIcon,
} from 'material-ui-icons'

// app
import {ItemEditDialog, ItemDeleteDialog, ItemMemorandumDialog} from '../components'
import {attemptFetchItem} from '../reducers/note'
import {toTextTable} from '../modules/Export'
import {Path, Url, Image, Setting} from '../modules'

const styles = theme => ({})

class ItemTopCardHeader extends React.Component {
  state = {
    anchorEl: null,
    menuOpen: false,
    memorandumOpen: false,
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget, menuOpen: true});
  }

  handleClose = () => {
    this.setState({menuOpen: false});
  }

  render() {
    const {currentItem, currentReservations} = this.props
    const {classes} = this.props
    const sharedMessage = `${currentItem.get('name')} の予約表を作成しました。${"\n"}リンク先はこちらです${"\n"}${Url.item(currentItem.get('token'))}${"\n"}`
    const reservationTable = toTextTable(currentReservations)
    const shareMessage = `${sharedMessage}${"\n\n"}現時点の予約者リスト${"\n\n"}${reservationTable}${"\n\n"}以上`
    const shareMailBody = `${sharedMessage}${"\n\n"}現時点の予約者リスト${"\n\n"}${reservationTable}${"\n\n"}以上`
    return (
      <div>
        <IconButton
          onClick={this.handleClick}
          color={'primary'}
        >
          <SettingsIcon/>
        </IconButton>
        <Drawer anchor="right" open={this.state.menuOpen} onClose={this.handleClose}>
          <div>
            <MenuItem
              onClick={() => {
                location.href = Url.shareToLine(shareMessage)
              }}
            >
              <ListItemIcon>
                <img style={{width: '24px'}} src={Image.lineIcon}/>
              </ListItemIcon>
              <ListItemText inset primary="LINEで共有する"/>
            </MenuItem>
            <MenuItem
              onClick={() => {
                location.href = Path.itemCalendar(currentItem.get('token'))
              }}
            >
              <ListItemIcon>
                <CalendarIcon/>
              </ListItemIcon>
              <ListItemText inset primary="カレンダーを取得する"/>
            </MenuItem>
            <MenuItem
              onClick={() => {
                location.href = 'mailto:' + '?subject=' + encodeURIComponent(`${currentItem.get('name')} の予約表 - ${Setting.appName}`) + '&body=' + encodeURIComponent(shareMailBody)
              }}
            >
              <ListItemIcon>
                <MailIcon/>
              </ListItemIcon>
              <ListItemText inset primary="メールで共有する"/>
            </MenuItem>
            <MenuItem
              onClick={() => location.href = Path.itemQrCode(currentItem.get('token'))}
            >
              <ListItemIcon>
                <FileDownloadIcon/>
              </ListItemIcon>
              <ListItemText inset primary="QRコード画像を取得"/>
            </MenuItem>
            <Divider/>
            <MenuItem
              onClick={() => {
              }}
            >
              <ItemEditDialog
                confirmationKeyword={currentItem.get('name')}
                icon={
                  <ListItemIcon>
                    <EditIcon/>
                  </ListItemIcon>
                }
              >
                <ListItemText inset primary="予約表名を編集する"/>
              </ItemEditDialog>
            </MenuItem>
            <MenuItem
              onClick={() => {
              }}
            >
              <ItemMemorandumDialog
                editable
                open={this.state.memorandumOpen}
                handleClose={() => this.setState({memorandumOpen: false})}
                onClick={() => this.setState({memorandumOpen: true})}
              >
                <ListItemIcon>
                  <NoteIcon/>
                </ListItemIcon>
                <ListItemText inset primary="メモを編集する"/>
              </ItemMemorandumDialog>
            </MenuItem>
            <MenuItem
              onClick={() => {
              }}
            >
              <ItemDeleteDialog
                icon={
                  <ListItemIcon>
                    <DeleteIcon style={{color: '#ff4081'}}/>
                  </ListItemIcon>
                }
              >
                <ListItemText inset primary="予約表の削除"/>
              </ItemDeleteDialog>
            </MenuItem>
          </div>
        </Drawer>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return ({
    draftItem: state.note.draftItem,
    currentItem: state.note.currentItem,
    currentReservations: state.note.currentReservations,
  })
}

const mapDispatchToProps = {
  attemptFetchItem,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ItemTopCardHeader))
