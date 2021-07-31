import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  add,
  update
} from '../../features/todo/todoSlice';
import { toastSuccess } from '../services/ToasterService';

export function Votes({ todo, index }) {
  const dispatch = useDispatch();
  console.log("todo", todo);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const todoObj = {}
    const result = await axios.post(
      `/todo/add`,
      todoObj,
    );
    console.log("save result ", result)
    if (result && result.data && result.data.status) {
      toastSuccess(result.data.message);
      dispatch(add(todoObj));
    }
  };

  const onClickUpVote = async (todo) => {
    const updateObj = JSON.parse(JSON.stringify(todo));
    updateObj.vote = updateObj.vote + 1;
    dispatch(update(updateObj));
  }

  const onClickDownVote = async (index, todo) => {

  }

  return (
    <div className="vote-icons text-center">
      <button className="vote-icon-up" onClick={() => onClickUpVote(todo)}><svg fill="#bbb" aria-hidden="true" width="36" height="25" viewBox="0 0 40 25"><path d="M2 26h32L18 10 2 26z"></path></svg></button>
      <div className="total-vot" style={{ lineHeight: 0.7 }}>{todo.vote}</div>
      <button className="vote-icon-down"><svg fill="#bbb" aria-hidden="true" width="36" height="25" viewBox="0 0 40 25"><path d="M2 10h32L18 26 2 10z"></path></svg></button>
    </div>
  );
}
