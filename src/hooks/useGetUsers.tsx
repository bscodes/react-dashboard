import { useEffect, useState } from 'react';
import { User } from '../types';

type GetUsers = (loggedIn: boolean) => {
  users: User[];
  error: any;
};

export const useGetUsers: GetUsers = (loggedIn) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: Response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const json = await response.json();
        setUsers(json);
      } catch (error: any) {
        setError(error);
      }
    };
    if (loggedIn) fetchUsers();
  }, [loggedIn]);

  return { users, error };
};
