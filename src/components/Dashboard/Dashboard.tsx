import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTodos } from '../../hooks/useGetTodos';
import { RootState } from '../../reducers';
import TodoView from '../Todo/Todo';
import './Dashboard.scss';

const Dashboard = () => {
  const { loggedIn } = useSelector((state: RootState) => state.auth);
  const { todos, error } = useGetTodos(loggedIn);

  return (
    <div className="dashboard-wrapper">
      {error && <div>{error.message}</div>}
      {todos && todos.map((item) => <TodoView key={item.id} todoItem={item} />)}
    </div>
  );
};

export default Dashboard;
