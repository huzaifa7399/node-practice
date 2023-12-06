import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

export type TDeck = {
  title: string;
  _id: string;
  cards: string[];
};

function App() {
  const [title, setTitle] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  const getAllCards = async () => {
    const resp = await fetch("http://localhost:5000/deck");
    const data = await resp.json();
    setDecks(data);
  };

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
    getAllCards();
  };

  const handleCardDelete = async (id: string) => {
    const resp = await fetch(`http://localhost:5000/deck/${id}`, {
      method: "DELETE",
    });
    const data = await resp.json();
    if (data.message === "successfully deleted") {
      setDecks(decks.filter((deck) => deck._id !== id));
    }
  };

  useEffect(() => {
    getAllCards();
  }, []);

  return (
    <>
      {updateTitle === "" ? (
        <div
          style={{
            marginBottom: "30px",
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            name="text"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <button onClick={handleCardCreation}>Add Deck</button>
        </div>
      ) : (
        <div
          style={{
            marginBottom: "30px",
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            name="text"
            value={updateTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUpdateTitle(e.target.value)
            }
          />
          <button onClick={handleCardCreation}>Update title</button>
          <button onClick={() => setUpdateTitle("")}>Add new deck</button>
        </div>
      )}

      {decks.map(({ title, _id, cards }: TDeck) => {
        return (
          <div
            key={_id}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-evenly",
              marginBottom: "10px",
            }}
          >
            <Link to={cards.length === 0 ? "" : `/cards/${_id}`}>
              <h4
                style={{
                  width: "200px",
                }}
              >
                {title}
              </h4>
            </Link>
            <button
              onClick={() => {
                handleCardDelete(_id);
              }}
            >
              delete
            </button>
            <button
              onClick={() => {
                setUpdateTitle(title);
              }}
            >
              update
            </button>
          </div>
        );
      })}
    </>
  );
}

export default App;
