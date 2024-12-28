"use client";

import React, { useState, useEffect, useRef } from "react";
import "./App.css"; // Für Styles

const CIRCLE_SIZE = 50;

const App = () => {
  const [touches, setTouches] = useState({});
  const [highlightedId, setHighlightedId] = useState(null);
  const timerRef = useRef(null);

  const handleTouchStart = (e) => {
    e.preventDefault();
    const newTouches = { ...touches };

    for (const touch of e.changedTouches) {
      newTouches[touch.identifier] = {
        x: touch.clientX,
        y: touch.clientY,
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
    }
  };

  const resetTimer = (clear = false) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!clear) {
      timerRef.current = setTimeout(() => {
        const touchIds = Object.keys(touches);
        if (touchIds.length > 0) {
          const randomId =
            touchIds[Math.floor(Math.random() * touchIds.length)];
          setHighlightedId(randomId);
        }
      }, 2000);
    }
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
          className={`circle ${highlightedId === id ? "highlighted" : ""}`}
          style={{
            left: pos.x - CIRCLE_SIZE / 2,
            top: pos.y - CIRCLE_SIZE / 2,
          }}
        ></div>
      ))}
    </div>
  );
};

export default App;
