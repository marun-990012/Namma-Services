
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { Toaster } from 'react-hot-toast';
import './index.css'
import App from './App.jsx'
import store from './redux/store/store.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
    <Toaster position="bottom-right" reverseOrder={false} />
  </BrowserRouter>
  </Provider>
  
)
