import { FC } from "react";
import { toDoList } from "../types";
import { CgCalendarDue } from "react-icons/cg";

type Props = {
  todos: toDoList[];
  onClickDelete: (index: number) => void;
  onClickTodoEdit: (todo: toDoList, index: number) => void;
};

export const ToDoList: FC<Props> = (props) => {
  const { todos, onClickDelete, onClickTodoEdit } = props;

  return (
    <div>
      <p className="italic text-slate-400 font-bold border-b">To Do 一覧</p>
      <ul className="list-disc marker:text-sky-400">
        {todos.map((todo, index) => (
          <li
            key={`todo_${index}`}
            className="border-b hover:bg-slate-50 p-2 cursor-pointer"
          >
            <div
              className="flex items-end"
              onClick={() => onClickTodoEdit(todo, index)}
            >
              <div className="w-10/12">
                <div>{todo.title}</div>
                <div className="text-sm text-slate-500">{todo.memo}</div>
                <ul className="list-disc marker:text-orange-400 text-xs text-slate-500 pl-4">
                  {todo.subTask.map((sub, subindex) => (
                    <li key={`sub_${subindex}`}>{sub}</li>
                  ))}
                </ul>
                <div className="text-sm text-slate-500 flex items-center mt-2">
                  <CgCalendarDue />
                  <span className="border border-dotted border-red-200 rounded-md px-1">
                    {todo.toDoDate?.toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="w-2/12">
                <button
                  className="text-white text-sm rounded-md ml-5 px-3 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300"
                  onClick={() => {
                    onClickDelete(index);
                  }}
                >
                  削 除
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
