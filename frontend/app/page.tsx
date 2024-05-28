"use client";

import React, { useState } from "react";
import { Box, Button, styled, TextField, Typography } from "@mui/material";
import axios from "axios";
import HistoryTable from "@/components/HistoryTable";

type Props = {};

type record = {
  row: number;
  col: number;
  result: number;
}[];

const Home = (props: Props) => {
  const [gridSize, setGridSize] = useState(3);
  const [startGameShow, setStartGameShow] = useState(false);
  const [squares, setSquares] = useState<any[]>([]);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(0);
  const [record, setRecord] = useState<record>([]);

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
    setRecord([]);
  }

  function changeGridSize(value: number) {
    if (value < 3 || Number.isNaN(value)) return;
    setGridSize(value);
  }

  const handleClick = (row: number, col: number) => {
    const newSquares = squares;
    if (newSquares[row][col] != 0) return;
    newSquares[row][col] = xIsNext ? 1 : 2;
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    calculateWinner(newSquares);
    let newArrRecord = [];
    newArrRecord = record;
    newArrRecord.push({ row: row, col: col, result: newSquares[row][col] });
    setRecord(newArrRecord);
  };

  const calculateWinner = (squares: any[]) => {
    // แนวนอน
    for (const row of squares) {
      if (row.every((i: number) => i === 1)) {
        setWinner(1);
      }
      if (row.every((i: number) => i === 2)) {
        setWinner(2);
      }
    }
    // แนวตั้ง
    for (const row of squares[0].map((_: any, colIndex: string | number) =>
      squares.map((row) => row[colIndex])
    )) {
      if (row.every((i: number) => i === 1)) {
        setWinner(1);
      }
      if (row.every((i: number) => i === 2)) {
        setWinner(2);
      }
    }
    // แนวทะแยง
    const diagonals: number[][] = [[], []];
    for (let i = 0; i < squares.length; i++) {
      diagonals[0].push(squares[i][i]);
      diagonals[1].push(squares[squares.length - 1 - i][i]);
    }
    if (
      diagonals[0].every((val) => val === 1) ||
      diagonals[1].every((val) => val === 1)
    ) {
      setWinner(1);
    }
    if (
      diagonals[0].every((val) => val === 2) ||
      diagonals[1].every((val) => val === 2)
    ) {
      setWinner(2);
    }
  };

  // useEffect(() => {
  //   // save game
  //   if (winner) {
  //     axios.post("http://localhost:8080/api/saveGame", {
  //       description: gridSize,
  //       winner: winner,
  //       record: record,
  //     });
  //   }
  // }, [winner]);

  function getHistory() {}

  function replayGame() {}

  return (
    <div>
      <Box px={12} pt={6} textAlign={"center"}>
        <Typography fontWeight={700} fontSize={48}>
          XO Game
        </Typography>
        {startGameShow ? (
          <Box display={"grid"} p={6}>
            <Typography fontWeight={700} fontSize={24}>
              Grid Size: {gridSize} X {gridSize}
            </Typography>
            <Box mt={5} display={"grid"}>
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
            <Box my={5}>
              <ButtonStartGame
                variant="contained"
                onClick={() => restartGame()}
              >
                Restart
              </ButtonStartGame>
            </Box>
            <Box mt={2} id="board" display={"grid"} gap={1}>
              {Array(gridSize)
                .fill(0)
                .map((_: any, row: number) => (
                  <Box
                    id="board-row"
                    key={row}
                    display={"flex"}
                    justifyContent={"center"}
                    gap={1}
                  >
                    {Array(gridSize)
                      .fill(0)
                      .map((_: any, col: number) => (
                        <Square
                          id="square"
                          key={col}
                          sx={{
                            backgroundColor:
                              winner != 0 && winner === squares[row][col]
                                ? "#000"
                                : "#fff",
                            color:
                              winner != 0 && winner === squares[row][col]
                                ? "#fff"
                                : "red",
                            "&:hover": {
                              backgroundColor:
                                winner != 0 && winner === squares[row][col]
                                  ? "#000"
                                  : "#fff",
                              color:
                                winner != 0 && winner === squares[row][col]
                                  ? "#fff"
                                  : "red",
                            },
                          }}
                          onClick={() => {
                            if (winner) return;
                            handleClick(row, col);
                          }}
                        >
                          {squares.length && squares[row][col] === 1
                            ? "X"
                            : squares.length && squares[row][col] === 2
                            ? "O"
                            : ""}
                        </Square>
                      ))}
                  </Box>
                ))}
            </Box>
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

const Square = styled(Button)(({ disabled }) => ({
  backgroundColor: disabled ? "#E5E5E5" : "#fff",
  width: "60px",
  height: "60px",
  border: "1px solid #000",
  fontSize: "32px",
  cursor: "pointer",
  color: "red",
}));
