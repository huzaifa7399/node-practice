import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState([]);
  const handleCardCreation = async () => {
    await fetch("http://localhost:5000/deck", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
      }),
    });
    setTitle("");
  };

  const getAllCards = async () => {
    const resp = await fetch("http://localhost:5000/deck");
    const data = await resp.json();
    setDecks(data);
  };

  useEffect(() => {
    getAllCards();
  }, []);
  return (
    <>
      <div>
        <input
          type="text"
          name="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleCardCreation}>Add Cards</button>
      </div>
      {decks.map(({ title }, idx) => {
        return (
          <div
            key={idx}
            style={{
              display: "grid",
            }}
          >
            <h1>{title}</h1>
          </div>
        );
      })}
    </>
  );
}

export default App;
