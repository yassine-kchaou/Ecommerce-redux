import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';
import { Provider } from 'react-redux' ;
import 'react-toastify/dist/ReactToastify.css';
import {
    persistStore,
    } from 'redux-persist'
    import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)
root.render(
<React.StrictMode>
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
<App />
</PersistGate>
</Provider>
</React.StrictMode>
);
