import React from 'react';
import ReactDOM from 'react-dom/client';
import Calculadora from './components/Calculadora';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Calculadora />
  </React.StrictMode>
);
