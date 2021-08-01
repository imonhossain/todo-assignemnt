import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [

  ],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add(state, action) {
      state.items.unshift(action.payload);
    },
    remove(state, action) {
      const index = state.items.findIndex(item => item._id === action.payload);
      state.items.splice(index, 1);
    },
    setTodo(state, action) {
      state.items = action.payload;
    },
    commentFlagChange(state, action) {
      const index = state.items.findIndex(item => item._id === action.payload);
      state.items[index].showComment = !state.items[index].showComment;
    },
    update(state, action) {
      const todo = action.payload;
      const index = state.items.findIndex(item => item._id === todo._id);
      state.items[index] = todo;
    },
  },
});

export const { add, remove, setTodo, commentFlagChange, update } = todoSlice.actions;
export const selectTodos = (state) => state.todo.items;
export default todoSlice.reducer;