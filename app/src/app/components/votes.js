import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  update
} from '../../features/todo/todoSlice';
import { toastSuccess } from '../services/ToasterService';
import { updateTodo } from '../services/TodoService';

export function Votes({ todo }) {
  const dispatch = useDispatch();
  const onClickUpVote = async (todo) => {
    const updateObj = JSON.parse(JSON.stringify(todo));
    updateObj.vote = updateObj.vote + 1;
    updateTodo(updateObj).then(result => {
      if (result) {
        dispatch(update(updateObj));
      }
    });
  }

  const onClickDownVote = async (todo) => {
    const updateObj = JSON.parse(JSON.stringify(todo));
    updateObj.vote = updateObj.vote - 1;
    updateTodo(updateObj).then(result => {
      if (result) {
        dispatch(update(updateObj));
      }
    });
  }

  return (
    <div className="vote-icons text-center">
      <button className="vote-icon-up" onClick={() => onClickUpVote(todo)}><svg fill="#bbb" aria-hidden="true" width="36" height="25" viewBox="0 0 40 25"><path d="M2 26h32L18 10 2 26z"></path></svg></button>
      <div className="total-vot" style={{ lineHeight: 0.7 }}>{todo.vote}</div>
      <button className="vote-icon-down" onClick={() => onClickDownVote(todo)}><svg fill="#bbb" aria-hidden="true" width="36" height="25" viewBox="0 0 40 25"><path d="M2 10h32L18 26 2 10z"></path></svg></button>
    </div>
  );
}
