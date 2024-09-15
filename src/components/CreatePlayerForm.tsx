import { database } from "@/firebase";
import { CreatePlayerDto } from "@/interfaces";
import { ref, set } from "firebase/database";

interface CreatePlayerFormProps {
  roomId: string;
  name: string;
  setName: (name: string) => void;
  color: string;
  setColor: (color: string) => void;
  setShowControls: (showControls: boolean) => void;
  playerId: string;
}

export default function CreatePlayerForm({
  roomId,
  name,
  setName,
  color,
  setColor,
  setShowControls,
  playerId,
}: CreatePlayerFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trim the name and generate a random name if it's empty
    // Player#1234
    const formattedName =
      name.trim() || `Player#${Math.floor(1000 + Math.random() * 9000)}`;

    const player: CreatePlayerDto = {
      id: playerId,
      name: formattedName,
      roomId,
      color,
    };

    const playerRef = ref(database, `${roomId}/players`);
    set(playerRef, player)
      .then(() => setName(formattedName))
      .then(() => setShowControls(true))
      .catch((error) => {
        console.error("Error adding player to database:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter player name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        maxLength={10}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg"
      />
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Join Game
      </button>
    </form>
  );
}
