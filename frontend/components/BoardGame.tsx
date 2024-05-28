import GameService from "@/api/GameService";
import { Box, Button, styled } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  gridSize: number;
  winner: number;
  setWinner: (x: number) => void;
  squares: any[];
  setSquares: (x: any[]) => void;
  xIsNext: boolean;
  setXIsNext: (x: boolean) => void;
};

type record = {
  row: number;
  col: number;
  result: number;
};

const BoardGame = ({
  gridSize,
  winner,
  setWinner,
  squares,
  setSquares,
  xIsNext,
  setXIsNext,
}: Props) => {
  const [record, setRecord] = useState<record[]>([]);

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

  useEffect(() => {
    // save game
    if (winner) {
      saveGame();
    }
  }, [winner]);

  function saveGame() {
    const res = GameService.gameSave({
      description: gridSize,
      winner: winner,
      record: record,
    }).then((x) => x);
    console.log(res);
  }

  return (
    <Box display={"grid"} gap={1}>
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
  );
};

export default BoardGame;

const Square = styled(Button)(({ disabled }) => ({
  backgroundColor: disabled ? "#E5E5E5" : "#fff",
  width: "60px",
  height: "60px",
  border: "1px solid #000",
  fontSize: "32px",
  cursor: "pointer",
  color: "red",
}));
