import { Todo } from '../../types';

interface ITodoProps {
  todoItem: Todo;
}

const TodoView = (props: ITodoProps) => {
  const { todoItem } = props;
  return (
    <div className="todo-info" key={todoItem.id}>
      <p>
        <b>Todo Name:</b> {todoItem.title}
      </p>
      <p>
        <b>Status:</b> {todoItem.completed ? 'Completed' : 'Not Completed'}
      </p>
    </div>
  );
};

export default TodoView;
