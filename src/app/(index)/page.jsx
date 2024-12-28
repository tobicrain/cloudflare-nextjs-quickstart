"use client";

import React, { useState, useEffect } from "react";

const App = () => {
  const [touchPoints, setTouchPoints] = useState([]);
  const [selectedFinger, setSelectedFinger] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);

  const handleTouchStart = (e) => {
    const points = Array.from(e.touches).map((touch) => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
    }));
    setTouchPoints(points);
  };

  const handleTouchMove = (e) => {
    const points = Array.from(e.touches).map((touch) => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
    }));
    setTouchPoints(points);
  };

  const handleTouchEnd = (e) => {
    const points = Array.from(e.touches).map((touch) => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
    }));
    setTouchPoints(points);
  };

  const handleSelectFinger = () => {
    if (touchPoints.length > 0) {
      const randomIndex = Math.floor(Math.random() * touchPoints.length);
      setSelectedFinger(touchPoints[randomIndex].id);
      setIsBlinking(true);

      // Stop blinking after 3 seconds
      setTimeout(() => {
        setIsBlinking(false);
        setSelectedFinger(null); // Reset selection
      }, 3000);
    }
  };

  useEffect(() => {
    // Automatically select a finger after 3 seconds if there are active touch points
    if (touchPoints.length > 0) {
      handleSelectFinger();
    }
  }, [touchPoints]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
        position: "relative",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {touchPoints.map((point) => (
        <div
          key={point.id}
          style={{
            position: "absolute",
            left: point.x - 50,
            top: point.y - 50,
            width: "100px",
            height: "100px",
            backgroundColor: point.id === selectedFinger && isBlinking ? "red" : "blue",
            borderRadius: "50%",
            animation:
              point.id === selectedFinger && isBlinking
                ? "blink 0.5s infinite"
                : "none",
          }}
        />
      ))}
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default App;