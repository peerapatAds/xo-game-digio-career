"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, styled, TextField, Typography } from "@mui/material";
import axios from "axios";
import HistoryTable from "@/components/HistoryTable";
import BoardGame from "@/components/BoardGame";
import GameService from "@/api/GameService";

type Props = {};

const Home = (props: Props) => {
  const [gridSize, setGridSize] = useState(3);
  const [startGameShow, setStartGameShow] = useState(false);
  const [squares, setSquares] = useState<any[]>([]);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(0);

  function startGame() {
    let newSquares: any[] = [];
    if (gridSize >= 3) {
      setStartGameShow(true);
      for (let index = 0; index < gridSize; index++) {
        newSquares.push(Array(gridSize).fill(0));
      }
      setSquares(newSquares);
    }
  }

  function restartGame() {
    setStartGameShow(false);
    setSquares([]);
    setWinner(0);
  }

  function changeGridSize(value: number) {
    if (value < 3 || Number.isNaN(value)) return;
    setGridSize(value);
  }

  useEffect(() => {
    if (!startGameShow) {
      getHistory();
    }
  }, [startGameShow]);

  function getHistory() {
    const res = GameService.getHistory().then((x) => x);
    console.log(res);
  }

  function replayGame() {}

  return (
    <div>
      <Box px={12} pt={6} textAlign={"center"}>
        <Typography fontWeight={700} fontSize={48}>
          XO Game
        </Typography>
        {startGameShow ? (
          <Box display={"grid"} p={6}>
            <Box display={"flex"} justifyContent={"center"} gap={3} pt={2}>
              <Typography fontWeight={700} fontSize={24}>
                Grid Size: {gridSize} X {gridSize}
              </Typography>
              <ButtonStartGame
                variant="contained"
                onClick={() => restartGame()}
              >
                Restart
              </ButtonStartGame>
            </Box>
            <Box my={6} display={"grid"}>
              <Typography fontWeight={700} fontSize={18}>
                Player:
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: "red",
                    margin: "0px 16px",
                  }}
                >
                  {winner ? (winner === 1 ? "X" : "O") : xIsNext ? "X" : "O"}
                </span>
                {winner ? "To Win!!!" : "To Move"}
              </Typography>
            </Box>
            <BoardGame
              gridSize={gridSize}
              winner={winner}
              setWinner={setWinner}
              squares={squares}
              setSquares={setSquares}
              xIsNext={xIsNext}
              setXIsNext={setXIsNext}
            ></BoardGame>
          </Box>
        ) : (
          <Box display={"grid"} p={6} justifyContent={"center"}>
            <Box pt={2} display={"flex"} gap={2} justifyContent={"center"}>
              <TextField
                label="Grid Size"
                InputProps={{
                  sx: {
                    paddingX: 1,
                    borderRadius: 10,
                    width: 285,
                    inputProps: { min: 3 },
                  },
                }}
                size="small"
                value={gridSize}
                type="number"
                error={gridSize < 3}
                helperText={gridSize < 3 && "minimum 3 x 3"}
                onChange={(e) => changeGridSize(parseInt(e.target.value))}
              ></TextField>
              <ButtonStartGame variant="contained" onClick={() => startGame()}>
                Start
              </ButtonStartGame>
            </Box>
            <Box pt={6}>
              <HistoryTable replayGame={replayGame}></HistoryTable>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Home;

const ButtonStartGame = styled(Button)(() => ({
  width: 128,
  borderRadius: 20,
  backgroundColor: "#000",
  "&:hover": {
    backgroundColor: "#000",
  },
}));
