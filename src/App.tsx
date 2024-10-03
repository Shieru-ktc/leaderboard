import { useEffect, useState } from "react";
import Page from "./components/Page";
import { RankedRecord as RecordSchema } from "./models";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./App.css";

type PageType = "Typing" | "Shooting";
function App() {
  const [records, setRecords] = useState<RecordSchema[]>([]);
  const [_, setWs] = useState<WebSocket | undefined>(undefined);

  const [currentPage, setCurrentPage] = useState<PageType>("Typing");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev === "Typing" ? "Shooting" : "Typing"));
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const ws = new WebSocket("wss://scores.shieru-lab.com/ws");
    setWs(ws);

    ws.onmessage = (event) => {
      const newRecord = JSON.parse(event.data) as RecordSchema;

      setRecords((prev) => {
        const existingIndex = prev.findIndex(
          (record) => record.record.id === newRecord.record.id
        );
        if (existingIndex !== -1) {
          const updatedRecords = [...prev];
          updatedRecords[existingIndex] = newRecord;
          return updatedRecords;
        } else {
          return [...prev, newRecord];
        }
      });
    };

    return () => {
      ws.close();
      setWs(undefined);
      setRecords([]);
    };
  }, []);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={currentPage}
        timeout={500}
        classNames="fade"
        unmountOnExit
        mountOnEnter
      >
        {currentPage === "Typing" ? (
          <Page
            title="タイピングゲーム ランキング"
            records={records
              .filter((v) => v.record.type === "TYPING")
              .sort((a, b) => b.record.score - a.record.score)}
          />
        ) : (
          <Page
            title="シューティングゲーム ランキング"
            records={records
              .filter((v) => v.record.type === "SHOOTING")
              .sort((a, b) => b.record.score - a.record.score)}
          />
        )}
      </CSSTransition>
    </SwitchTransition>
  );
}

export default App;
