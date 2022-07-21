import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { ToDoList } from "./ToDoList";
import { useToDoList } from "../hooks/useToDoList";
import "react-datepicker/dist/react-datepicker.css";
import { toDoList } from "../types";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import { useAutoResizeTextArea } from "../hooks/useAutoResizeTextArea";

export const App: FC = () => {
  const { todos, addTodo, deleteTodo, editTodo } = useToDoList();

  const today = new Date();
  const [todo, setTodo] = useState<toDoList>({
    title: "",
    memo: "",
    subTask: [],
    toDoDate: today,
  });

  const [title, setTitle] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [toDoDate, setTodoDate] = useState<Date | null>(today);
  const [subTask, setSubTask] = useState<string[]>([]);
  const [editFlag, setEditFlag] = useState<Boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(-1);

  useEffect(() => {
    setTitle(todo.title);
    setMemo(todo.memo);
    setTodoDate(todo.toDoDate);
    setSubTask(todo.subTask);
  }, [todo.title, todo.memo, todo.toDoDate, todo.subTask]);

  registerLocale("ja", ja);

  const textAreaRef = useAutoResizeTextArea(memo);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeMemo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const onChangeSubTask = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const subTaskAll = subTask.slice();
    subTaskAll[index] = e.target.value;
    setSubTask(subTaskAll);
  };

  const reset = () => {
    setTitle("");
    setMemo("");
    setTodoDate(today);
    setSubTask([]);
    setTodo({
      title: "",
      memo: "",
      subTask: [],
      toDoDate: new Date(),
    });
    setEditFlag(false);
    setEditIndex(-1);
  };

  const onClickSubTaskAdd = () => {
    const subTaskAll = subTask.slice();
    if (subTaskAll.length === 20) {
      window.confirm("サブタスクは20個までです！");
      return;
    }
    subTaskAll.push("");
    setSubTask(subTaskAll);
  };

  const onClickAdd = () => {
    const toDoList = {
      title,
      memo,
      subTask: subTask.filter((v) => v !== ""),
      toDoDate,
    };
    addTodo(toDoList);
    reset();
  };

  const onClickCancel = () => {
    reset();
  };

  const onClickDelete = useCallback(
    (index: number) => {
      deleteTodo(index);
    },
    [deleteTodo]
  );

  const onClickTodoEdit = (todo: toDoList, index: number) => {
    setTodo(todo);
    setEditFlag(true);
    setEditIndex(index);
  };

  const onClickEdit = () => {
    const toDoList = {
      title,
      memo,
      subTask: subTask.filter((v) => v !== ""),
      toDoDate,
    };
    editTodo(toDoList, editIndex);
    reset();
  };

  return (
    <div className="px-20 py-10">
      <h1 className="text-3xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold text-center text-white py-2">
        Todo List
      </h1>
      <div className="my-10">
        <div className="border border-slate-300 rounded-md shadow-sm py-2 px-3">
          <input
            className="w-full placeholder:italic placeholder:text-slate-400 bg-white focus:outline-none"
            placeholder="タイトル"
            type="text"
            value={title}
            onChange={onChangeTitle}
          />
          <textarea
            className="resize-none text-sm text-slate-500 box-border w-full min-height: 20px overflow-hidden placeholder:italic placeholder:text-slate-400 bg-white focus:outline-none"
            placeholder="メモ"
            value={memo}
            onChange={onChangeMemo}
            ref={textAreaRef}
          ></textarea>
          <div className="text-sm text-slate-500 py-2 px-3">
            <ul className="list-disc marker:text-sky-400">
              {subTask.map(
                (sub, index) =>
                  sub !== null && (
                    <li key={`subtask_${index}`} className="py-px">
                      <input
                        className="w-full placeholder:italic placeholder:text-slate-400 bg-white focus:outline-none"
                        placeholder="サブタスク"
                        type="text"
                        value={sub}
                        onChange={(e) => onChangeSubTask(e, index)}
                        autoFocus={index === subTask.length - 1 ? true : false}
                      ></input>
                    </li>
                  )
              )}
            </ul>
          </div>
          <button
            id="subTaskAdd"
            className="flex text-slate-400 items-center hover:text-green-500 mb-2 w-2/12"
            onClick={onClickSubTaskAdd}
          >
            <AiFillPlusCircle className="text-green-500" />
            <span>サブタスクを追加</span>
          </button>
          <div className="flex items-center justify-start w-2/12">
            <label className="text-slate-400 mr-1">
              <BsCalendar3 className="icon" />
            </label>
            <div className="border border-slate-300 rounded-md shadow-sm p-px">
              <DatePicker
                className="text-green-500 w-32 focus:outline-none"
                selected={toDoDate}
                onChange={(date) => setTodoDate(date)}
                locale="ja"
                dateFormat="yyyy/MM/dd"
                minDate={today}
                dateFormatCalendar={"yyyy年 MM月"}
              />
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-end">
          <button
            className="mr-3 disabled:bg-slate-100 disabled:text-slate-300 disabled:border-slate-200 disabled:shadow-none text-white rounded-md p-2 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300"
            disabled={title === ""}
            onClick={onClickCancel}
          >
            キャンセル
          </button>
          <button
            className={`${
              editFlag ? "hidden" : ""
            } disabled:bg-slate-100 disabled:text-slate-300 disabled:border-slate-200 disabled:shadow-none text-white rounded-md p-2 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300`}
            disabled={title === ""}
            onClick={onClickAdd}
          >
            タスクを追加
          </button>
          <button
            className={`${
              !editFlag ? "hidden" : ""
            } disabled:bg-slate-100 disabled:text-slate-300 disabled:border-slate-200 disabled:shadow-none text-white rounded-md p-2 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300`}
            disabled={title === ""}
            onClick={onClickEdit}
          >
            タスクを修正
          </button>
        </div>
      </div>
      <ToDoList
        todos={todos}
        onClickTodoEdit={onClickTodoEdit}
        onClickDelete={onClickDelete}
      />
    </div>
  );
};
