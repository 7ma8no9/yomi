import React from 'react'

import ErrorBoundary from "./components/ErrorBoundary";
import Router from "./router";
import Scrollbars from "react-custom-scrollbars";
import {Box} from "@mui/material";

function App() {
  return (
    <ErrorBoundary>
      <Box sx={{ height: '100vh', overflow: 'hidden' }}>
        <Scrollbars autoHide>
          <Router />
        </Scrollbars>
      </Box>
    </ErrorBoundary>
  )
}

export default App;
