import React from 'react';
import './index.css'
import {ThemeProvider,createTheme} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';
//@ts-ignore
import AdobeClean from './fonts/AdobeClean/AdobeClean-Regular.woff' ;


import {CustomCheckbox} from './Components/CustomCheckbox'
import { Tag } from './Components/Tag';
import { TextBox } from './Components/TextBox';
import { CustomButton } from './Components/CustomButton';
import { LandingPage } from './Pages/LandingPage';
const theme = createTheme({
  typography: {
    fontFamily: 'AdobeClean, Arial',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [AdobeClean],
      },
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
       <CssBaseline />
       <CustomCheckbox/>
       <Tag color='#d2ceff'/>
       <TextBox/>
       <CustomButton/>
       <LandingPage/>
    </ThemeProvider>
  );
}

export default App;
