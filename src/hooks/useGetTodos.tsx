import { useEffect, useState } from 'react';
import { Todo } from '../types';

type GetTodos = (loggedIn: boolean) => {
  todos: Todo[];
  error: any;
};
export const useGetTodos: GetTodos = (loggedIn) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response: Response = await fetch(
          'https://jsonplaceholder.typicode.com/todos/'
        );
        const json = await response.json();
        setTodos(json);
      } catch (error) {
        setError(true);
      }
    };
    if (loggedIn) fetchTodos();
  }, [loggedIn]);

  return { todos, error };
};
