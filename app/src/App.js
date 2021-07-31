import React from 'react';
import { Todo } from './features/todo/Todo';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  axios.defaults.baseURL = "http://localhost:3002/"
  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-200 justify-center py-10">
        <h1 className="font-bold text-3xl py-2">Todos</h1>
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
