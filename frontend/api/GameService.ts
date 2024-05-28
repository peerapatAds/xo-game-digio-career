import api from "./https_request";

type record = {
  row: number;
  col: number;
  result: number;
};

type gameData = {
  description: number;
  winner: number;
  record: record[];
};

const GameService = {
  getHistory() {
    return api.get({ path: "/history" });
  },
  gameSave(data: gameData) {
    return api.post({ path: "/savegame", body: data });
  },
};

export default GameService;
