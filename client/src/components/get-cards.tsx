import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TDeck } from "../App";

const GetCards = () => {
  const [title, setTitle] = useState("");
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
      <div
        style={{
          marginBottom: "30px",
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
        <button onClick={handleCardCreation}>Add Cards</button>
      </div>

      {decks.map(({ title, _id }: TDeck) => {
        return (
          <div
            key={_id}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <Link to={`/cards/${_id}`}>
              <h4>{title}</h4>
            </Link>
            <button
              onClick={() => {
                handleCardDelete(_id);
              }}
            >
              delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default GetCards;
