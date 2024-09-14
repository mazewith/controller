import { database } from "@/firebase";
import { ControlSchema, Direction } from "@/interfaces";
import { ref, set } from "firebase/database";
import { Timestamp } from "firebase/firestore";
import { useCallback, useEffect } from "react";

interface ControlProps {
  name: string;
  roomId: string;
  playerId: string;
}

function Control({ name, roomId, playerId }: ControlProps) {
  const handleClick = useCallback(
    (direction: Direction) => {
      const controlRef = ref(database, `${roomId}/controls`);
      const control: ControlSchema = {
        playerId,
        roomId,
        direction,
        timestamp: Timestamp.now().toMillis(),
      };
      set(controlRef, control);
    },
    [playerId, roomId]
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          handleClick(Direction.UP);
          break;
        case "ArrowDown":
          handleClick(Direction.DOWN);
          break;
        case "ArrowLeft":
          handleClick(Direction.LEFT);
          break;
        case "ArrowRight":
          handleClick(Direction.RIGHT);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleClick]);

  const controlButtonStyle = {
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    fontSize: "3rem",
    color: "white",
    backgroundColor: "#4a90e2",
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-[#f5f5f5] rounded-[16px] max-w-[500px] mx-auto text-center shadow-[0px 8px 20px rgba(0, 0, 0, 0.1)] p-8">
      {name && (
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{name}</h1>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <button
          color="primary"
          style={{ gridColumn: "2", ...controlButtonStyle }}
          onClick={() => handleClick(Direction.UP)}
        >
          ↑
        </button>
        <button
          color="primary"
          style={{ gridColumn: "1", ...controlButtonStyle }}
          onClick={() => handleClick(Direction.LEFT)}
        >
          ←
        </button>
        <button
          color="primary"
          style={{ gridColumn: "3", ...controlButtonStyle }}
          onClick={() => handleClick(Direction.RIGHT)}
        >
          →
        </button>
        <button
          color="primary"
          style={{ gridColumn: "2", ...controlButtonStyle }}
          onClick={() => handleClick(Direction.DOWN)}
        >
          ↓
        </button>
      </div>
    </div>
  );
}

export default Control;
