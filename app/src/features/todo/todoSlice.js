import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    // { name: 'Make toast', date: new Date(), comments: ["abc", "Def", "Ghi"], vote: 0, showComment: true },
    // { name: 'Eat toast', date: new Date(), comments: ["abc", "Def", "Ghi"], vote: 0, showComment: false },
    // { name: 'Wash dishes', date: new Date(), comments: ["abc", "dasd", "Ghi"], vote: 0, showComment: false },
  ],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add(state, action) {
      state.items.push(action.payload);
    },
    remove(state, action) {
      state.items.splice(action.payload, 1);
    },
    setTodo(state, action) {
      state.items = action.payload;
    },
    commentFlagChange(state, action) {
      const index = action.payload;
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