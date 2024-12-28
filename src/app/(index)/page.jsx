"use client";

import React, { useState, useEffect } from "react";

const App = () => {
  const [touchPoints, setTouchPoints] = useState([]);
  const [selectedFinger, setSelectedFinger] = useState(null);

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

    // Reset selection when all fingers are removed
    if (points.length === 0) {
      setSelectedFinger(null);
    }
  };

  useEffect(() => {
    if (touchPoints.length > 0) {
      // Select a random finger after 3 seconds
      const timer = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * touchPoints.length);
        setSelectedFinger(touchPoints[randomIndex].id);
      }, 3000);

      return () => clearTimeout(timer); // Clear the timer if touchPoints change
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
            backgroundColor:
              point.id === selectedFinger ? "red" : "blue", // Selected finger turns red
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};

export default App;