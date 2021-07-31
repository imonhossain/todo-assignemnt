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
      state.items.push({
        name: action.payload
      });
    },
    remove(state, action) {
      state.items.splice(action.payload, 1);
    },
    setTodo(state, action) {
      console.log("action", action);
      state.items = action.payload;
    }
  },
});

export const { add, remove, setTodo } = todoSlice.actions;
export const selectTodos = (state) => state.todo.items;
export default todoSlice.reducer;