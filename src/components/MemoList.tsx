import { FC } from "react";

type Props = {
  memos: string[];
  onClickDelete: (index: number) => void;
};

export const MemoList: FC<Props> = (props) => {
  const { memos, onClickDelete } = props;

  return (
    <div className="border border-slate-300 rounded-md py-2 px-3 shadow-sm sm:text-sm ">
      <p className="italic text-slate-400 font-bold mb-3">To Do 一覧</p>
      <ul className="marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-500">
        {memos.map((memo, index) => (
          <li key={memo}>
            <div className="flex">
              <p>{memo}</p>
              <button
                className="text-white rounded-full ml-5 px-3 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300"
                onClick={() => {
                  onClickDelete(index);
                }}
              >
                削 除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
