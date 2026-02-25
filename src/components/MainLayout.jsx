import React from "react";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <div
      style={{
        background: "#f3f4f6",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "1400px",
          position: "relative",
        }}
      >
        {/* OUTER BORDER */}
        <div
          style={{
            position: "relative",
            background: "#ffffff",
            border: "4px solid #2F80ED",
            borderRadius: "30px",
            padding: "20px",
          }}
        >
          {/* LEFT TOP DIP */}
          <div
            style={{
              position: "absolute",
              top: "-30px",
              left: "120px",
              width: "320px",
              height: "70px",
              background: "#ffffff",
              border: "4px solid #2F80ED",
              borderBottom: "none",
              borderRadius: "30px 30px 0 0",
            }}
          />

          {/* RIGHT TOP DIP */}
          <div
            style={{
              position: "absolute",
              top: "-30px",
              right: "40px",
              width: "320px",
              height: "70px",
              background: "#ffffff",
              border: "4px solid #2F80ED",
              borderBottom: "none",
              borderRadius: "30px 30px 0 0",
            }}
          />

          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
}
