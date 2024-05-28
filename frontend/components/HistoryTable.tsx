import { Camera } from "@mui/icons-material";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = {
  replayGame: () => void;
};

type rowsData = {
  no: string;
  description: string;
  winner: string;
};

const HistoryTable = ({ replayGame }: Props) => {
  const [rows, setRows] = useState<rowsData[]>([]);

  useEffect(() => {
    getHistory();
  }, []);

  function getHistory() {}

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, minHeight: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={1} sx={{ fontWeight: 700, fontSize: 16 }}>
                Game no.
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>
                Description
              </TableCell>
              <TableCell colSpan={1} sx={{ fontWeight: 700, fontSize: 16 }}>
                Winner
              </TableCell>
              <TableCell colSpan={1} sx={{ fontWeight: 700, fontSize: 16 }}>
                Replay
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length ? (
              rows.map((row: rowsData, idx: number) => (
                <TableRow key={idx}>
                  <TableCell colSpan={1}>{row.no}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell colSpan={1}>{row.winner}</TableCell>
                  <TableCell colSpan={1}>
                    <IconButton onClick={() => replayGame()}>
                      <Camera />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  sx={{ fontSize: 18, textAlign: "center" }}
                  colSpan={6}
                >
                  no records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoryTable;
