import React, { useEffect } from 'react';
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

export function Todo() {
  let todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      axios.get("/todo").then(result => {
        let { data } = result.data;
        dispatch(setTodo(data));
      })
    } catch (error) {
      console.log(error);
    }
  }, []);

  const removeTodoFromStore = (index) => {
    dispatch(remove(index));
  }

  const onClickComment = (index) => {
    dispatch(commentFlagChange(index));
  }

  const onClickRemove = async (index, id) => {
    if (!id) {
      removeTodoFromStore(index);
      return;
    }
    const result = await axios.delete(
      `/todo/delete/${id}`
    );
    if (result && result.data && result.data.status === true) {
      toastSuccess(result.data.message);
      removeTodoFromStore(index);
    } else {
      toastError("Faild to delete");
    }
  }



  return (
    <div className="bg-white rounded-xl p-4 w-80 shadow" style={{ width: 440 }}>
      <AddTodo />
      <div>
        {todos.length === 0 && <div>No todos yet</div>}
        {todos.map((todo, index) => (
          <div key={index} className="bg-gray-100 rounded-xl p-2 mb-2 bg-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center pl-2">
                <Votes todo={todo} index={index} />
                <div className='leading-tight text-gray-500 pl-2'>
                  <h6>{todo.name}</h6>
                  <small>Date: {todo.createdAt ? convertDateToString(todo.createdAt) : null}</small>
                </div>
              </div>
              <div className="flex">
                <div
                  onClick={() => onClickComment(index)}
                  className="text-gray-500 hover:text-gray-600  cursor-pointer pr-2 text-2xl"
                >
                  <span className="fa fa-comment" />
                </div>

                <div
                  onClick={() => onClickRemove(index, todo._id)}
                  className="text-red-500 hover:text-red-600  cursor-pointer pr-2 text-2xl"
                >
                  <span className="fa fa-minus-circle" />
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
