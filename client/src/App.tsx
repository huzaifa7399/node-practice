import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");

  const handleCardCreation = async () => {
    const resp = await fetch("http://localhost:5000/deck", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
      }),
    });
    console.log(resp, title);
  };

  return (
    <>
      <div>
        <input
          type="text"
          name="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="card">
        <button onClick={handleCardCreation}>Add Cards</button>
      </div>
    </>
  );
}

export default App;
