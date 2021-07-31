import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  add,
  remove,
  selectTodos,
} from './todoSlice';

export function Todo() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(add(name));
    setName('');
  };
  
  return (
    <div className="bg-white rounded-xl p-4 w-80 shadow">
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
        <div>
        {todos.length === 0 && <div>No todos yet</div>}
        {todos.map((todo, index) => (
          <div key={index} className="bg-gray-100 rounded-xl p-2 mb-2 bg-gray-100">
            <div className="flex">
              <div className="flex-auto pl-2">
                  <div className='leading-tight text-gray-500'>{todo.name}</div>
              </div>
              <div className="flex-none pr-2">
                <div 
                  onClick={() => dispatch(remove(index))}
                  className="text-red-500 hover:text-red-600 float-right cursor-pointer"
                >
                  <span className="fa fa-minus-circle" />
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
}
