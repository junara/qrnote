import {createMuiTheme} from 'material-ui/styles';
import blue from 'material-ui/colors/blue';

// material-uiのblueをベースにprimary colorをブランドの色にする
const theme = createMuiTheme({
  common: {
    height1em: {
      height: '1em',
    },
  },
  palette: {
    primary: { light: blue[300], main: blue[500], dark: blue[700] },
  },
  overrides: {
    MuiTypography: {
      root: {
        // wordBreak: 'break-all',
      }
    },
  },
});

export default theme
