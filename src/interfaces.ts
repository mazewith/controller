export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export interface ControlSchema {
  roomId: string;
  playerId: string;
  direction: Direction;
  timestamp: number;
}

export interface CreatePlayerDto {
  id: string;
  name: string;
  color: string;
  roomId: string;
}
