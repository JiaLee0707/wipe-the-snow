import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles, getTheme } from './styles';

import Background from "./components/Background";

function App() {
    const theme = getTheme();

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Background />
        </ThemeProvider>
  );
}

export default App;
