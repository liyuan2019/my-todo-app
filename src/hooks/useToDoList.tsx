import { useCallback, useState } from "react";
import { toDoList } from "../types";

export const useToDoList = () => {
  const [todos, setTodos] = useState<toDoList[]>([]);

  const addTodo = useCallback(
    (toDoList: toDoList) => {
      const newTodos = [...todos];
      newTodos.push(toDoList);
      setTodos(newTodos);
    },
    [todos]
  );

  const deleteTodo = useCallback(
    (index: number) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    },
    [todos]
  );

  const editTodo = useCallback(
    (toDoList: toDoList, index: number) => {
      const newTodos = [...todos];
      newTodos[index] = toDoList;
      setTodos(newTodos);
    },
    [todos]
  );

  return { todos, addTodo, deleteTodo, editTodo };
};
