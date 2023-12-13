import { createGlobalStyle, css } from 'styled-components';

const reset = css`
  /* http://meyerweb.com/eric/tools/css/reset/ 
  v2.0 | 20110126
  License: none (public domain)
*/
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  input,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* extends */
  button {
    all: unset;
    border: none;
    outline: none;
    background-color: inherit;
    cursor: pointer;
  }
   a {
    color: #000;
    text-decoration: none;
    outline: none;
  }
   a:hover,
  a:active {
    text-decoration: none;
  }
  textarea {
    resize: none;
    outline: none;
    border: none;
  }
  * {
    font-family: var(--font-family-system);
  }
`;

const GlobalStyle = createGlobalStyle`
  ${reset}
  :root {
    --nav-narrow-width: 72px; 
    --nav-medium-width: 256px;
    --font-family-system: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  @keyframes loading {
    0% {
      transform: translateX(-150%);
    }
    50% {
      transform: translateX(-60%);
    }
    100% {
      transform: translate(150%);
    }
  }

  @keyframes warningShake {
    0%, 100% {
      transform: translateX(0);
    }

    10%, 30%, 50%, 70%, 90% {
      transform: translateX(3px);
    }

    20%, 40%, 60%, 80% {
      transform: translateX(-3px);
    }
  }

  color: ${({ theme }) => theme.lightTheme.textColor};
`;

export default GlobalStyle;
