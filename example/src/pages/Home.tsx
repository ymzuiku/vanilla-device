import React from "react";
import { AppBar } from "../components/AppBar";
import { Header } from "../components/Header";

const list = Array(200).fill(null);

export const Home = () => {
  return (
    <div>
      <Header />
      <div
        data-can-scroll="true"
        style={{
          overflow: "auto",
          height:
            "calc(var(--ih) - var(--safe-top) - var(--safe-bottom) - 50px)",
          backgroundColor: "#f6f6f9"
        }}
      >
        {list.map((v, i) => {
          return (
            <div
              key={i}
              style={{ textAlign: "center", lineHeight: "88px", height: 88 }}
            >
              cell {i}
            </div>
          );
        })}
      </div>
      <AppBar />
    </div>
  );
};
