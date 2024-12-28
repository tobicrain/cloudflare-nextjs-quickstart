"use client";

import React, { useState, useEffect } from "react";

const App = () => {
  const [touchPoints, setTouchPoints] = useState([]);
  const [selectedFinger, setSelectedFinger] = useState(null);

  // Toleranzbereich für Bewegungen in Pixeln
  const TOLERANCE = 20;

  const handleTouchStart = (e) => {
    const newTouches = Array.from(e.touches).map((touch) => ({
      id: touch.identifier,
      startX: touch.clientX,
      startY: touch.clientY,
      x: touch.clientX,
      y: touch.clientY,
    }));

    setTouchPoints((prevTouches) => {
      // Merge new touches with existing ones (keep existing IDs)
      const mergedTouches = [...prevTouches];
      newTouches.forEach((newTouch) => {
        if (!prevTouches.some((t) => t.id === newTouch.id)) {
          mergedTouches.push(newTouch);
        }
      });
      return mergedTouches;
    });
  };

  const handleTouchMove = (e) => {
    const updatedTouches = Array.from(e.touches).map((touch) => {
      const existingTouch = touchPoints.find((t) => t.id === touch.identifier);
      if (existingTouch) {
        // Update position but keep the original startX/startY
        return {
          ...existingTouch,
          x: touch.clientX,
          y: touch.clientY,
        };
      }
      return null;
    }).filter(Boolean);

    setTouchPoints(updatedTouches);
  };

  const handleTouchEnd = (e) => {
    const remainingTouches = Array.from(e.touches).map((touch) => ({
      id: touch.identifier,
      startX: touch.clientX,
      startY: touch.clientY,
      x: touch.clientX,
      y: touch.clientY,
    }));
    setTouchPoints(remainingTouches);

    if (remainingTouches.length === 0) {
      setSelectedFinger(null); // Reset if no touches left
    }
  };

  useEffect(() => {
    let timer;

    if (touchPoints.length > 0) {
      // Check if all fingers are within the tolerance range
      const isWithinTolerance = touchPoints.every(
        (touch) =>
          Math.abs(touch.x - touch.startX) <= TOLERANCE &&
          Math.abs(touch.y - touch.startY) <= TOLERANCE
      );

      if (isWithinTolerance) {
        timer = setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * touchPoints.length);
          setSelectedFinger(touchPoints[randomIndex].id);
        }, 2000); // 2-second timer
      }
    } else {
      setSelectedFinger(null); // Reset if no fingers
    }

    return () => clearTimeout(timer); // Clear timer if touchPoints change
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
