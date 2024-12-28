"use client";

import React, { useState } from "react";

const App = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);

  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
  ];

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumberOfPlayers(isNaN(value) ? 0 : Math.min(value, colors.length));
    setSelectedPlayer(null); // Reset selection on change
  };

  const handleSelectPlayer = () => {
    if (numberOfPlayers > 0) {
      const randomIndex = Math.floor(Math.random() * numberOfPlayers);
      setSelectedPlayer(randomIndex);
      setIsBlinking(true);

      // Stop blinking after 3 seconds
      setTimeout(() => setIsBlinking(false), 3000);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Finger-Touch Game</h1>
      <label>
        Anzahl Spieler:{" "}
        <input
          type="number"
          min="1"
          max={colors.length}
          value={numberOfPlayers}
          onChange={handleInputChange}
        />
      </label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(
            numberOfPlayers,
            4
          )}, 1fr)`,
          gap: "10px",
          margin: "20px 0",
        }}
      >
        {Array.from({ length: numberOfPlayers }).map((_, index) => (
          <div
            key={index}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: colors[index % colors.length],
              border:
                index === selectedPlayer && isBlinking
                  ? "5px solid white"
                  : "none",
              animation:
                index === selectedPlayer && isBlinking
                  ? "blink 0.5s infinite"
                  : "none",
            }}
          />
        ))}
      </div>
      <button onClick={handleSelectPlayer}>Auswählen</button>
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
