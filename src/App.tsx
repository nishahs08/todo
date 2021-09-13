import React ,{useState} from "react";
import "./index.css";
import { ThemeProvider, createTheme, styled } from "@material-ui/core/styles";
import { CssBaseline, Box } from "@material-ui/core";
//@ts-ignore
import AdobeClean from "./fonts/AdobeClean/AdobeClean-Regular.woff";

import { Dashboard } from "./Pages/Dashboard";
import { v4 as uuidv4 } from 'uuid';
import {category, todo} from './types'
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

const categories : category[] = [
  {id:1, type: "work", color: "#d2ceff" },
  {id:2, type: "study", color: "#d1e5f7" },
  {id:3, type: "entertainment", color: "#ffcece" },
  {id:4, type: "family", color: "#daf2d6" },
];

const todoList = [{
  id:uuidv4(),
  title:"to do bla bla bla",
  description:'skjdhfkj sdkhgkhg dhgdhgl dghdhg dhghsdkhg kjdhgsoiug sdfpsoudtg sl;edfpouspd;ajufrp',
  done:false,
  tags:[1,2,3,4]
},
{ id:uuidv4(),
  title:"to do bla bla bla",
  description:'skjdhfkj sdkhgkhg dhgdhgl dghdhg dhghsdkhg kjdhgsoiug sdfpsoudtg sl;edfpouspd;ajufrp',
  done:false,
  tags:[1,2,3]
},
{
  id:uuidv4(),
  title:"to do bla bla bla",
  description:'skjdhfkj sdkhgkhg dhgdhgl dghdhg dhghsdkhg kjdhgsoiug sdfpsoudtg sl;edfpouspd;ajufrp',
  done:false,
  tags:[1,2]
},
{
  id:uuidv4(),
  title:"to do bla bla bla",
  description:'skjdhfkj sdkhgkhg dhgdhgl dghdhg dhghsdkhg kjdhgsoiug sdfpsoudtg sl;edfpouspd;ajufrp',
  done:true,
  tags:[1,2,3]
}]

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
  const [todos,setTodos] = useState<todo[]>([...todoList])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard categories={categories} todos={todos} setTodos={setTodos}/>
    </ThemeProvider>
  );
}

export default App;
