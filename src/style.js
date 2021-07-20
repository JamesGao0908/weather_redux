import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    &.bk-bg{
        background-color:rgb(50, 50, 50);
    }
}


code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}


.ant-carousel .slick-dots{
    position: relative  !important;
    margin-top:50px;
}
.ant-carousel{
    margin-top:10px;
    color : white !important;
}

div#root{
    min-height: 100vh;
}

*{
    box-sizing:border-box;
}

`


export default GlobalStyle;