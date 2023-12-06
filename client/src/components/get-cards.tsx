import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const GetCards = () => {
  const { cardId } = useParams();
  const [title, setTitle] = useState("");
  const [cards, setCards] = useState<string[]>([]);

  const handleCardCreation = async () => {
    await fetch(`http://localhost:5000/deck/${cardId}/create-card`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        text: title,
      }),
    });
    setCards((prev) => {
      return [...prev, title];
    });
    setTitle("");
  };

  const handleCardDelete = async (id: number) => {
    const resp = await fetch(
      `http://localhost:5000/deck/${cardId}/cards/${id}`,
      {
        method: "DELETE",
      }
    );
    if (resp.status === 200) {
      setCards((prev) => prev.splice(id, 0));
    }
  };

  useEffect(() => {
    const getAllCards = async () => {
      if (!cardId) return;
      const resp = await fetch(`http://localhost:5000/deck/${cardId}/get-card`);
      const data = await resp.json();
      setCards(data);
    };
    getAllCards();
  }, [cardId]);

  return (
    <>
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <Link to={"/"}>{"<--"}</Link>
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

      {cards?.map((card, idx) => {
        return (
          <div
            key={idx}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <h4>{card}</h4>

            <button
              onClick={() => {
                handleCardDelete(idx);
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
