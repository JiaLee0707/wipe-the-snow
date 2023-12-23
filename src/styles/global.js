import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const global = createGlobalStyle`
  ${reset}; 

  html {
    font-size: 62.5%;
  }
  
  body {
    font-size: 1.6rem;
  }

  button {
    cursor: pointer;
  }
  
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
`;

export default global;
