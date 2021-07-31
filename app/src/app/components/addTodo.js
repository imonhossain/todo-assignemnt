import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  add
} from '../../features/todo/todoSlice';
import { toastSuccess } from '../services/ToasterService';

export function AddTodo() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const todoObj = {
      name,
      comments: [],
      vote: 0
    }
    const result = await axios.post(
      `/todo/add`,
      todoObj,
    );
    console.log("save result ", result)
    if (result && result.data && result.data.status) {
      toastSuccess(result.data.message);
      dispatch(add(todoObj));
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <input
          type="text"
          className="flex-initial bg-gray-100 rounded-xl p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full mr-2 pl-4"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button
          className="flex-initial bg-blue-100 hover:bg-blue-200 rounded-xl p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-20"
        >
          <span className="fa fa-plus text-blue-500" />
        </button>
      </div>
    </form>
  );
}
