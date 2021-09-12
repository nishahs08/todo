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
import { Categories } from "./Components/Categories";
import { Dashboard } from "./Pages/Dashboard";
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

const categories = [
  { type: "work", color: "#d2ceff" },
  { type: "study", color: "#d1e5f7" },
  { type: "entertainment", color: "#ffcece" },
  { type: "family", color: "#daf2d6" },
];


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
      <Dashboard categories={categories}/>
      {/* <Todo/>
      <Categories categories={categories}/> */}
    </ThemeProvider>
  );
}

export default App;
