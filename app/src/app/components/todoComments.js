import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  update
} from '../../features/todo/todoSlice';
import { updateTodo } from '../services/TodoService';

export function TodoComments({ todo }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const onClickSendComment = async (todo) => {
    const updateObj = JSON.parse(JSON.stringify(todo));
    updateObj.comments.push(comment);
    updateTodo(updateObj).then(result => {
      if (result) {
        dispatch(update(updateObj));
        setComment('')
      }
    });
  }

  return (
    <div>
      <div className="flex">
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="flex-initial rounded-xl p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full mr-2 pl-4"
        />
        <button
          onClick={() => onClickSendComment(todo)}
          className="flex-initial bg-blue-100 hover:bg-blue-200 rounded-xl p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-20"
        >
          Send
        </button>
      </div>
      <ul>{todo.comments.map((comment, commentIndex) => (
        <li key={commentIndex}>{commentIndex + 1}. {comment}</li>
      ))}</ul>
    </div>
  );
}
