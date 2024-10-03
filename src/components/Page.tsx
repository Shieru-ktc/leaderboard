import { CSSTransition, TransitionGroup } from "react-transition-group";
import Record from "./Record";
import "./Page.css";
import { PartialProps as PartialRecordProps } from "./Record";

interface Props {
  records: PartialRecordProps[];
  title: string;
}

export default function Page(props: Props) {
  return (
    <div>
      <h1 className="text-3xl mt-3">{props.title}</h1>
      <div className="flex flex-row h-full space-x-64 mx-52">
        <div className="w-[50vw]">
          <h1 className="text-3xl font-bold">上位のスコア</h1>
          <TransitionGroup className={"flex flex-col space-y-6 p-3"}>
            {[...props.records]
              .sort((a, b) => b.record.score - a.record.score)
              .slice(0, 5)
              .map((v, i) => (
                <CSSTransition
                  key={v.record.id}
                  timeout={500}
                  classNames="fade1"
                >
                  <Record {...v} rank={i + 1} />
                </CSSTransition>
              ))}
          </TransitionGroup>
        </div>
        <div className="w-[50vw]">
          <h1 className="text-3xl font-bold">最近のスコア</h1>
          <TransitionGroup className={"flex flex-col space-y-6 p-3"}>
            {[...props.records]
              .sort((a, b) => b.record.timestamp - a.record.timestamp)
              .slice(0, 5)
              .map((v) => (
                <CSSTransition
                  key={v.record.id}
                  timeout={500}
                  classNames="fade2"
                >
                  <Record {...v} />
                </CSSTransition>
              ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}
