import React from 'react';
import AppRoutes from './Routes/AppRoutes';
import './index.css';

import { ToastContainer , Bounce} from 'react-toastify';

const App = () => {
  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Bounce}
    />
     <AppRoutes />
    </>
   
  );
};

export default App;