import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { convertDateToString } from '../../app/services/Utilities';
import axios from 'axios';
import {
  remove,
  setTodo,
  selectTodos,
  commentFlagChange
} from './todoSlice';
import { AddTodo } from '../../app/components/addTodo';
import { toastError, toastSuccess } from '../../app/services/ToasterService';
import { Votes } from '../../app/components/votes';
import { TodoComments } from '../../app/components/todoComments';

export function Todo() {
  let todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [sortby, setSortby] = useState(1);

  useEffect(() => {
    try {
      axios.get("/todo").then(result => {
        let { data } = result.data;
        setTodos(data);
      })
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setTodos = (todos) => {
    dispatch(setTodo(todos));
  }

  const onClickComment = (id) => {
    dispatch(commentFlagChange(id));
  }

  const onClickRemove = async (id) => {
    const result = await axios.delete(
      `/todo/delete/${id}`
    );
    if (result && result.data && result.data.status === true) {
      toastSuccess(result.data.message);
      dispatch(remove(id));
    } else {
      toastError("Faild to delete");
    }
  }
  const onChangeSortBy = (value) => {
    setSortby(value)
    let sortArry = JSON.parse(JSON.stringify(todos));
    if (value == 3) {
      sortArry.sort((a, b) => (a.vote > b.vote) ? -1 : ((b.vote > a.vote) ? 1 : 0));
    } else if (value == 2) {
      sortArry.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
    } else {
      sortArry.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0));
    }
    setTodos(sortArry);
  }

  return (
    <>
      <div className="flex items-center justify-between" style={{ width: 440 }}>
        <h1 className="font-bold text-3xl py-2">Todos</h1>
        <div className="flex items-center">
          <span className="pr-3">Sortby</span>
          <select value={sortby} onChange={e => onChangeSortBy(e.target.value)} className="flex-initial bg-gray-100 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full mr-2 pl-4">
            <option value="1">Create date</option>
            <option value="2">Name </option>
            <option value="3">Votes</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 w-80 shadow" style={{ width: 440 }}>
        <AddTodo />
        <div>
          {todos.length === 0 && <div>No todos yet</div>}
          {todos.map((todo, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-2 mb-2 bg-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center pl-2">
                  <Votes todo={todo} />
                  <div className='leading-tight text-gray-500 pl-2'>
                    <h6>{todo.name}</h6>
                    <small>Date: {todo.createdAt ? convertDateToString(todo.createdAt) : null}</small>
                  </div>
                </div>
                <div className="flex">
                  <div
                    onClick={() => onClickComment(todo._id)}
                    className="text-gray-500 hover:text-gray-600  cursor-pointer pr-2 text-2xl"
                  >
                    <span className="fa fa-comment" />
                  </div>

                  <div
                    onClick={() => onClickRemove(todo._id)}
                    className="text-red-500 hover:text-red-600  cursor-pointer pr-2 text-2xl"
                  >
                    <span className="fa fa-minus-circle" />
                  </div>

                </div>
              </div>
              <div className="pl-12">
                {
                  todo.showComment ? <TodoComments todo={todo} /> : null
                }

              </div>

            </div>
          ))}
        </div>
      </div>
    </>

  );
}
