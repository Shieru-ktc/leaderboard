import { twMerge } from "tailwind-merge";
import { RankedRecord as RecordSchema, TypingRecord } from "../models";

export interface Props extends PartialProps {
  rank: number;
  className?: string;
}

export interface PartialProps extends RecordSchema {}

function getCssByRank(rank: number) {
  if (rank === 1) {
    return "shadow-xl shadow-yellow-500/60";
  } else if (rank === 2) {
    return "shadow-lg shadow-slate-500/80";
  } else if (rank === 3) {
    return "shadow-lg shadow-yellow-800/60";
  }
  return "";
}

export default function Record(props: Props) {
  return (
    <div
      className={twMerge(
        "rounded-xl text-left px-5 py-7 drop-shadow-xl bg-white bg-opacity-90",
        getCssByRank(props.rank),
        props.className
      )}
    >
      <div className="flex flex-row space-x-5 flex-grow items-center">
        <p className="flex-none text-xl font-bold text-gray-600 w-8">
          <span className="text-xl font-medium">#</span>
          <span className="text-3xl font-extrabold">{props.rank}</span>
        </p>
        <div className="flex flex-grow flex-col">
          <p className="text-3xl font-normal">{props.record.name}</p>
          <p className="text-md">
            {new Date(props.record.timestamp * 1000).toLocaleString("ja-JP", {
              timeZone: "Asia/Tokyo",
            })}
          </p>
        </div>

        <div className="flex flex-col items-end">
          <p className="flex-none text-4xl italic font-semibold text-gray-700">
            {props.record.score}
            <span className="not-italic ml-3 font-normal text-xl">pts</span>
          </p>
          {props.record.type === "TYPING" ? (
            <div className="flex space-x-3">
              <p className="">
                <span>
                  {(props.record as TypingRecord).metadata.avg_kps.toFixed(2)}
                </span>{" "}
                kps
              </p>
              <p className="">
                <span>
                  {(
                    (1 -
                      (props.record as TypingRecord).metadata.misses /
                        (props.record as TypingRecord).metadata.correct) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </p>
              <p className="text-red-700">
                <span>{(props.record as TypingRecord).metadata.misses}</span>{" "}
                <span>misses</span>
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
