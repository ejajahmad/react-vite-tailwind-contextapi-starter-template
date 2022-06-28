import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { StateContext } from '../context/StateContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StateContext>
            <App />
        </StateContext>
    </React.StrictMode>
);
