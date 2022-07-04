import { ChangeEvent, FC, SetStateAction, useCallback, useState } from "react";
import { MemoList } from "./MemoList";
import { useMemoList } from "../hooks/userMemoList";

export const App: FC = () => {
  const { memos, addTodo, deleteTodo } = useMemoList();

  const [text, setText] = useState<string>("");

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickAdd();
    }
  };

  const onClickAdd = () => {
    addTodo(text);
    setText("");
  };

  const onClickDelete = useCallback(
    (index: number) => {
      deleteTodo(index);
    },
    [deleteTodo]
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold text-center text-white py-2">
        Todo List
      </h1>
      <div className="py-10">
        <input
          className="peer mr-10 w-5/12 placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Input Something..."
          type="text"
          value={text}
          onChange={onChangeText}
          onKeyDown={onKeyDown}
        />
        <button
          className=" disabled:bg-slate-100 disabled:text-slate-300 disabled:border-slate-200 disabled:shadow-none text-white rounded-full py-2 px-6 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300"
          disabled={text === ""}
          onClick={onClickAdd}
        >
          追 加
        </button>
      </div>
      <MemoList memos={memos} onClickDelete={onClickDelete} />
    </div>
  );
};
