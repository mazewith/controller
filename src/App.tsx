import { useMemo, useRef, useState } from "react";
import Control from "@/components/Control";
import CreatePlayerForm from "@/components/CreatePlayerForm";
import { useSearchParams } from "./hooks/useSearchParams";

export default function App() {
  const { roomId } = useSearchParams();
  const playerIdRef = useRef(Math.random().toString());
  const playerId = playerIdRef.current;

  const [name, setName] = useState("");
  const [color, setColor] = useState(
    `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")}`
  );
  const [showControls, setShowControls] = useState(false);

  const custStyle = useMemo(
    () => ({ background: `linear-gradient(135deg, ${color}, #fff)` }),
    [color]
  );

  return (
    <div
      className="min-h-screen min-w-screen flex items-center justify-center text-center"
      style={custStyle}
    >
      {showControls ? (
        <Control name={name} roomId={roomId} playerId={playerId} />
      ) : (
        <CreatePlayerForm
          roomId={roomId}
          name={name}
          setName={setName}
          color={color}
          setColor={setColor}
          setShowControls={setShowControls}
          playerId={playerId}
        />
      )}
    </div>
  );
}
