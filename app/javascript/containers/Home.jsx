import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import scrollToComponent from 'react-scroll-to-component'
import classNames from 'classnames'

// material-ui
import {withStyles, Grid, Typography, Button} from 'material-ui'

// app
import {ItemCreationDialog} from '../components'
import {
  showItemCreationModal
} from '../reducers/note'
import {
  createLiveDemo,
} from '../reducers/liveDemo'
import {Image, Path, Setting} from '../modules'


const styles = theme => ({
  section: {
    padding: '48px 24px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
  },
  blueBackground: {
    backgroundColor: '#2196f3',
  },
  imageBackground: {
    minHeight: '100vh',
    backgroundImage: `url(${Image.heroBackgroundImage})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    // backgroundAttachment: 'fixed', // iphoneで動かないのでコメントアウト
    backgroundSize: 'cover',
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  lightBlueBackground: {
    backgroundColor: '#E3F2FD',
  },
  maxWidth1000: {
    maxWidth: '1000px'
  },
  imageIcon: {
    height: '1em',
    width: '1em',
  }
})

class Home extends React.Component {
  componentDidMount() {
    scrollToComponent(this[`hero`], {
      align: 'top',
      duration: 1000
    })
  }

  onClickLiveDemo = () => {
    this.props.createLiveDemo({
      name: 'demo name',
      callback: (itemToken) => {
        this.props.history.push(Path.newItem(itemToken));
      }
    })
  }

  render() {
    const {classes} = this.props
    return (
      <div ref={(section) => {
        this[`hero`] = section
      }}>
        <div
          className={
            classNames(
              classes.section,
              classes.blueBackground,
              classes.imageBackground,
            )
          }
        >
          <Grid spacing={24} container justify='space-around' alignItems='center' direction='column'
                className={classes.maxWidth1000}
          >
            <Grid item>
              <Grid container justify={'center'} spacing={0}>
                <Grid item>
                  <Typography
                    style={{color: 'white'}}
                    variant='display3'
                    color='default'
                    align='center'
                  >
                    {'5秒で作る'}
                  </Typography>

                </Grid>
                <Grid item>
                  <Typography
                    style={{color: 'white'}}
                    variant='display3'
                    color='default'
                    align='center'
                  >
                    {'予約表'}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant='title'
                          color='default'
                          align='center'
                          gutterBottom
              >
                {'全てのモノをネットとつなぐ'}
              </Typography>
            </Grid>
            <Grid item>
              <img style={{width: '150px'}} src={Image.qrNoteLogo}/>
            </Grid>
            <Grid item>
              <Button variant='raised' color='primary'
                      onClick={e => this.props.showItemCreationModal()}
              >
                <Typography variant='display1' color='inherit' style={{padding: '0.5em 0.2em'}}>
                  {'予約表を作成する'}
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button variant='raised' color='secondary'
                      onClick={this.onClickLiveDemo}
              >
                <Typography variant='title' color='inherit' style={{padding: '0.5em 0.2em'}}>
                  {'LIVE DEMO'}
                  <Typography variant={'caption'} color='inherit'>サンプルデータとすべての機能を無料で提供</Typography>
                  <Typography variant={'caption'} color='inherit'>デモ開始から3日後にデータは自動的に削除されます</Typography>
                </Typography>
              </Button>
            </Grid>
            <ItemCreationDialog/>
          </Grid>
        </div>
        <div className={classNames(classes.section, classes.whiteBackground)}>
          <div className={classes.maxWidth1000}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant={'display1'} gutterBottom>
                  {Setting.appName}は誰でも使えるオンライン予約表作成サービスです
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant={'headline'}>
                  プロジェクターや。実験装置や工作機械。会議室やミーティングスペース。
                </Typography>
                <Typography variant={'headline'}>
                  みんなで使うモノ全て、オンライン予約できるようにします。
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify={'center'} spacing={40}>
              <Grid item sm={4} xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant={'title'}>ユーザー登録不要です</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={'body1'}>予約表の作成に、メールアドレス、パスワードなどのユーザー登録は一切不要です。予約表を作成したいモノの名前を入力さえするだけ。それだけで、専用のオンライン予約表作成完了です。</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <Typography variant={'title'}>予約するのもユーザー登録不要です</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={'body1'}>予約表から予約するユーザーもユーザー登録は必要ありません。専用に作られたオンライン予約表にアクセスするだけで、予約表を活用できます</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant={'title'}>予約も最短5秒</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={'body1'}>オンライン予約表ができるのは予約するだけ。使い方は非常にシンプル。予約者は、希望時間帯のボタンを押して、名前を入力すれば予約完了です。</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={classNames(classes.section, classes.lightBlueBackground)}>
          <div className={classes.maxWidth1000}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant={'display1'} gutterBottom>
                  シェアも簡単
                </Typography>
              </Grid>
            </Grid>
            <Grid container justify={'center'} spacing={24}>
              <Grid item sm={4} xs={12}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <Typography variant={'title'}>スマートフォンの予定表と連携</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant={'body1'}>クリックするだけで予約日時をスマートフォンのカレンダーに登録できます。これで予約を忘れません。</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <Typography variant={'title'}>紙の予約表はもう不要</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={'body1'}>紙の予約表をQRコードのシールに置き換えましょう。ユーザーはスマートフォンでQRコードをスキャンするだけで予約表にアクセスできます。</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={4} xs={12}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <Typography variant={'title'}>データはあなたのもの</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={'body1'}>予約表のデータはあなたのものです。予約内容はいつでも業界標準のデータフォーマットであるiCalendar形式で書き出せるので安心です。</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(
  state => {
    return (state)
  },
  {
    showItemCreationModal,
    createLiveDemo,
  }
)(withStyles(styles)(Home)))
