import React from 'react';
import { Todo } from './features/todo/Todo';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  axios.defaults.baseURL = "http://localhost:8080/"
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
