import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="relative h-screen bg-gray-200 overflow-hidden">
      <div className="absolute w-[24rem] h-[24rem] bg-blue-400 rounded-full blur-3xl opacity-50 top-30 left-20 animate-move1"></div>

      <div className="absolute w-[36rem] h-[36rem] bg-pink-300 rounded-full blur-3xl opacity-40 top-40 right-10 animate-move2"></div>

      <div className="absolute w-[22rem] h-[22rem] bg-green-400 rounded-full blur-3xl opacity-30 bottom-20 left-40 animate-move3"></div>

      <div className="absolute w-[22rem] h-[22rem] bg-yellow-400 rounded-full blur-3xl opacity-30 bottom-20 left-[50rem] animate-move2"></div>

      <div className="h-[100vh] w-[100vw] text-center">
        <App />
      </div>
    </div>
  </StrictMode>
);
