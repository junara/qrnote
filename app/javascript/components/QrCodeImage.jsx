import React from 'react'
import {QRCode} from 'react-qr-svg';

// material-ui
import {withStyles} from 'material-ui/styles';

// app
import {Image, Path} from "../modules";

const colorBlack = '#000000'
const colorWhite = '#FFFFFF'
const qrLevel = 'Q'
const styles = theme => ({
  ...theme.common,
  root: {
    position: 'relative',
    maxWidth: '100px',
  },
  qrSize: {
    width: '100%',
    height: 'auto',
  },
  logoCenter: {
    position: 'absolute',
    top: '35%',
    left: '35%',
    width: '30%',
    height: 'auto',
  },
})

class QrCodeImage extends React.PureComponent {
  render() {
    const {itemToken, classes} = this.props
    return (
      <div className={classes.root}>
        <QRCode
          bgColor={colorWhite}
          fgColor={colorBlack}
          level={qrLevel}
          value={location.href}
          className={classes.qrSize}
        />
        <img onClick={() => location.href = Path.itemQrCode(itemToken)}
             src={Image.qrNoteLogoBgWhite}
             className={classes.logoCenter}/>
      </div>
    )
  }
}

export default withStyles(styles)(QrCodeImage)

