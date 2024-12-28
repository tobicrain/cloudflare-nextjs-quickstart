"use client";

import React, { useState, useEffect } from "react";

const App = () => {
  const [touchPoints, setTouchPoints] = useState([]);
  const [selectedFinger, setSelectedFinger] = useState(null);

  useEffect(() => {
    let timer;
    if (touchPoints.length > 0) {
      // Start timer when a new touch is registered
      timer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * touchPoints.length);
        setSelectedFinger(touchPoints[randomIndex].id); // Select a random finger
      }, 2000); // 2-second timer
    } else {
      setSelectedFinger(null); // Reset selection when no touches
    }

    return () => clearTimeout(timer); // Clear timer if touchPoints change
  }, [touchPoints]);

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
    setTouchPoints(points); // Update positions of all fingers
  };

  const handleTouchEnd = (e) => {
    const remainingTouches = Array.from(e.touches).map((touch) => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
    }));
    setTouchPoints(remainingTouches); // Update to remaining touches

    // Reset selection if no fingers are left
    if (remainingTouches.length === 0) {
      setSelectedFinger(null);
    }
  };

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
            backgroundColor:
              point.id === selectedFinger ? "red" : "blue", // Highlight selected finger
            borderRadius: "50%",
            transition: "background-color 0.3s", // Smooth transition
          }}
        />
      ))}
    </div>
  );
};

export default App;
