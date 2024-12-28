"use client";

import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const CIRCLE_SIZE = 80; // Größere Kreise

const App = () => {
  const [touches, setTouches] = useState({});
  const [highlightedId, setHighlightedId] = useState(null);
  const [isPulsing, setIsPulsing] = useState(false);
  const timerRef = useRef(null);

  const handleTouchStart = (e) => {
    e.preventDefault();
    const newTouches = { ...touches };

    for (const touch of e.changedTouches) {
      newTouches[touch.identifier] = {
        x: touch.clientX,
        y: touch.clientY,
        color: generateRandomColor(),
      };
    }

    setTouches(newTouches);

    if (Object.keys(newTouches).length >= 2) {
      resetTimer();
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const updatedTouches = { ...touches };

    for (const touch of e.changedTouches) {
      if (updatedTouches[touch.identifier]) {
        updatedTouches[touch.identifier] = {
          ...updatedTouches[touch.identifier],
          x: touch.clientX,
          y: touch.clientY,
        };
      }
    }

    setTouches(updatedTouches);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    const updatedTouches = { ...touches };

    for (const touch of e.changedTouches) {
      delete updatedTouches[touch.identifier];
    }

    setTouches(updatedTouches);

    if (Object.keys(updatedTouches).length === 0) {
      resetTimer(true);
      setHighlightedId(null);
      setIsPulsing(false);
    }
  };

  const resetTimer = (clear = false) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!clear) {
      setIsPulsing(true); // Start Pulsieren
      timerRef.current = setTimeout(() => {
        const touchIds = Object.keys(touches);
        if (touchIds.length > 0) {
          const randomId =
            touchIds[Math.floor(Math.random() * touchIds.length)];
          setHighlightedId(randomId);
          setIsPulsing(false); // Pulsieren stoppen
        }
      }, 2000);
    }
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="App"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {Object.entries(touches).map(([id, pos]) => (
        <div
          key={id}
          className={`circle ${
            isPulsing ? "pulsing" : highlightedId === id ? "highlighted" : ""
          }`}
          style={{
            left: pos.x - CIRCLE_SIZE / 2,
            top: pos.y - CIRCLE_SIZE / 2,
            backgroundColor:
              highlightedId === null
                ? pos.color
                : highlightedId === id
                ? "red"
                : "black",
          }}
        ></div>
      ))}
    </div>
  );
};

export default App;
