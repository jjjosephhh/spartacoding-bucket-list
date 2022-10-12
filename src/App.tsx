import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

interface IItem {
  id: string;
  description: string;
  done: boolean;
}

const storageKey = "SPARTA_CODING_BUCKETLIST_KEY";

function App() {
  const [items, setItems] = useState<IItem[]>(() => {
    const dataStr = localStorage.getItem(storageKey);
    if (dataStr) return JSON.parse(dataStr);
    return [];
  });
  const [description, setDescription] = useState("");
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [JSON.stringify(items)]);

  return (
    <>
      <div className="mypic">
        <h1>Bucket List</h1>
      </div>
      <div className="mybox">
        <div className="mybucket">
          <input
            value={description}
            onChange={({ target: { value: v } }) => setDescription(v)}
            id="bucket"
            className="form-control"
            type="text"
            placeholder="Describe your bucket list item here"
          />
          <button
            onClick={() => {
              setItems([
                ...items,
                {
                  id: uuidv4(),
                  description,
                  done: false,
                },
              ]);
              setDescription("");
            }}
            type="button"
            className="btn btn-outline-primary"
          >
            Save this item
          </button>
        </div>
      </div>

      {Boolean(items.length) && (
        <div className="mybox" id="bucket-list">
          {items.map(({ id, description, done }) => {
            return (
              <li key={id}>
                <h2 className={`${done ? "done" : ""}`}>✅ {description}</h2>
                <button
                  onClick={() => {
                    setItems((prev) =>
                      prev.map((item) => {
                        if (item.id === id) {
                          return { ...item, done: !item.done };
                        }
                        return item;
                      })
                    );
                  }}
                  type="button"
                  className={`btn btn-outline-${done ? "danger" : "primary"}`}
                >
                  {done ? "Cancel" : "Mark as complete"}
                </button>
              </li>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
