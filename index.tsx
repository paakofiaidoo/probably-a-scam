
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// Firebase app initialization is handled in firebaseConfig.ts and its import ensures it runs.
// No need to import db or app here unless directly used, which it isn't.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);