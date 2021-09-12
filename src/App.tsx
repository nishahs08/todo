import React from "react";
import "./index.css";
import { ThemeProvider, createTheme, styled } from "@material-ui/core/styles";
import { CssBaseline, Box } from "@material-ui/core";
//@ts-ignore
import AdobeClean from "./fonts/AdobeClean/AdobeClean-Regular.woff";

import { CustomCheckbox } from "./Components/CustomCheckbox";
import { Tag } from "./Components/Tag";
import { TextBox } from "./Components/TextBox";
import { CustomButton } from "./Components/CustomButton";
import { LandingPage } from "./Pages/LandingPage";
import { Form } from "./Components/Form";
import {Todo} from "./Components/Todo"
const theme = createTheme({
  typography: {
    fontFamily: "AdobeClean, Arial",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [AdobeClean],
      },
    },
  },
});

const Container = styled(Box)({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Container>
        <Form/>

      </Container> */}
      <Todo/>
    </ThemeProvider>
  );
}

export default App;
