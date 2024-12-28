"use client";

import React, { useState, useEffect } from "react";

function App() {
  const [fingers, setFingers] = useState({});
  const [timer, setTimer] = useState(null);
  const [highlightedFinger, setHighlightedFinger] = useState(null);

  // Start Timer if there are any registered fingers
  useEffect(() => {
    if (Object.keys(fingers).length > 0) {
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => {
        const fingerIds = Object.keys(fingers);
        if (fingerIds.length > 0) {
          const randomFingerId =
            fingerIds[Math.floor(Math.random() * fingerIds.length)];
          setHighlightedFinger(randomFingerId);
        }
      }, 2000);
      setTimer(newTimer);
    } else {
      if (timer) clearTimeout(timer);
      setHighlightedFinger(null);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [fingers]);

  const handleTouchStart = (e) => {
    const newFingers = { ...fingers };
    for (let touch of e.changedTouches) {
      newFingers[touch.identifier] = {
        startX: touch.clientX,
        startY: touch.clientY,
        x: touch.clientX,
        y: touch.clientY,
      };
    }
    setFingers(newFingers);
  };

  const handleTouchMove = (e) => {
    const updatedFingers = { ...fingers };
    for (let touch of e.changedTouches) {
      const finger = updatedFingers[touch.identifier];
      if (finger) {
        const dx = Math.abs(finger.startX - touch.clientX);
        const dy = Math.abs(finger.startY - touch.clientY);
        if (dx > 20 || dy > 20) {
          finger.x = touch.clientX;
          finger.y = touch.clientY;
        }
      }
    }
    setFingers(updatedFingers);
  };

  const handleTouchEnd = (e) => {
    const updatedFingers = { ...fingers };
    for (let touch of e.changedTouches) {
      delete updatedFingers[touch.identifier];
    }
    setFingers(updatedFingers);
  };

  const renderCircles = () => {
    return Object.keys(fingers).map((fingerId) => {
      const { x, y } = fingers[fingerId];
      const isHighlighted = highlightedFinger === fingerId;
      return (
        <div
          key={fingerId}
          style={{
            position: "absolute",
            left: x - 25 + "px",
            top: y - 25 + "px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: isHighlighted ? "red" : "blue",
            border: isHighlighted ? "2px solid yellow" : "2px solid white",
          }}
        ></div>
      );
    });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {renderCircles()}
    </div>
  );
}

export default App;
