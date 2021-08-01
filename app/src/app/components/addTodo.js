import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  add
} from '../../features/todo/todoSlice';
import { toastSuccess } from '../services/ToasterService';
import { addTodo } from '../services/TodoService';

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
    addTodo(todoObj).then(result => {
      if (result) {
        toastSuccess(result.data.message)
        dispatch(add(result.data.todo));
        setName('');
      }
    });
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
