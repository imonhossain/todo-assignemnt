import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { convertDateToString } from '../services/Utilities';
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
    <div className="bg-white rounded-xl p-4 w-80 shadow" style={{ width: 440 }}>
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
            <div className="flex items-center justify-between">
              <div className="flex items-center pl-2">
                <div className="vote-icons text-center">
                  <button className="vote-icon-up"><svg fill="#bbb" aria-hidden="true" width="36" height="25" viewBox="0 0 40 25"><path d="M2 26h32L18 10 2 26z"></path></svg></button>
                  <div className="total-vot" style={{ lineHeight: 0.7 }}>{todo.vote}</div>
                  <button className="vote-icon-down"><svg fill="#bbb" aria-hidden="true" width="36" height="25" viewBox="0 0 40 25"><path d="M2 10h32L18 26 2 10z"></path></svg></button>
                </div>
                <div className='leading-tight text-gray-500 pl-2'>
                  <h6>{todo.name}</h6>
                  <small>Date: {convertDateToString(todo.date)}</small>
                </div>
              </div>
              <div className="flex-none pr-2">
                <div
                  onClick={() => dispatch(remove(index))}
                  className="text-red-500 hover:text-red-600 float-right cursor-pointer pr-2 text-2xl"
                >
                  <span className="fa fa-minus-circle" />
                </div>
                <div
                  onClick={() => dispatch(remove(index))}
                  className="text-gray-500 hover:text-gray-600 float-right cursor-pointer pr-2 text-2xl"
                >
                  <span className="fa fa-comment" />
                </div>
              </div>
            </div>
            <div className="pl-12">
              {
                todo.showComment ? <div>
                  <div className="flex">
                    {/* <span>Post Comment: </span> */}
                    <input
                      type="text"
                      className="flex-initial rounded-xl p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full mr-2 pl-4"
                    />
                    <button
                      className="flex-initial bg-blue-100 hover:bg-blue-200 rounded-xl p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-20"
                    >
                      Send
                    </button>
                  </div>
                  <ul>{todo.comments.map((comment, commentIndex) => (
                    <li key={commentIndex}>{commentIndex + 1}. {comment}</li>
                  ))}</ul>
                </div> : null
              }

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
