import React from 'react';
import { Todo } from './features/todo/Todo';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from './config/app.config';
function App() {
  axios.defaults.baseURL = baseURL;
  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-200 justify-center py-10">
        <Todo />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /></>
  );
}

export default App;
