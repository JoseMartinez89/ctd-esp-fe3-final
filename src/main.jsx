import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import { ContextProvider } from './Components/utils/global.context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
      <App/>
  </ContextProvider>,
  
);