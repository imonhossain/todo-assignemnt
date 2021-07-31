import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { name: 'Make toast' },
    { name: 'Eat toast' },
    { name: 'Wash dishes' },
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
  },
});

export const { add, remove } = todoSlice.actions;
export const selectTodos = (state) => state.todo.items;
export default todoSlice.reducer;