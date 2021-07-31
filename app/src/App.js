import React from 'react';
import { Todo } from './features/todo/Todo';

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200 justify-center py-10">
      <h1 className="font-bold text-3xl py-2">Todos</h1>
      <Todo />
    </div>
  );
}

export default App;
