import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// material-ui
import {MuiThemeProvider} from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';

// app
import {Home, About, Header, Item, NewItem, Error} from './'
import {FetchingScreen} from '../components'
import {
  showSnackbar,
  closeSnackbar,
} from '../reducers/note'
import theme from '../assets/theme'

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Header/>
            {!this.props.error.get('status') ?
              <Switch>
                <Route exact path={'/'} component={Home}/>
                <Route exact path={'/items/:token'} component={Item}/>
                <Route exact path={'/new_items/:token'} component={NewItem}/>
                <Route path={'/about'} component={About}/>
              </Switch>
              :
              <Error/>
            }
          </div>
        </BrowserRouter>
        <Snackbar
          open={this.props.snackbarOpen}
          message={<span id="message-id">{this.props.snackbarMessage}</span>}
          onClose={() => this.props.closeSnackbar()}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
        <FetchingScreen fetching={this.props.fetching}/>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return ({
      snackbarOpen: state.note.snackbarOpen,
      snackbarMessage: state.note.snackbarMessage,
      fetching: state.note.fetching,
      error: state.app.error,
    }
  )
}

const mapDispatchToProps = {
  showSnackbar,
  closeSnackbar,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
