import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MissingPiecesService from "../../services/missingPiecesService";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const PiecesTable = ({ missingPieces, setMissingPieces }) => {
  const missingPiecesService = new MissingPiecesService();

  async function handleDelete(pieceId) {
    await missingPiecesService.delete(pieceId);

    setMissingPieces(
      missingPieces.filter((piece) => piece.piece_id !== pieceId)
    );
  }

  async function handleCollected(pieceId, data) {
    await missingPiecesService.update(pieceId, data);

    setMissingPieces(
      missingPieces.map((piece) => {
        if (piece.piece_id === pieceId) {
          piece.collected = 1;
        }
        return piece;
      })
    );
  }

  async function handleCancellationCollected(pieceId, data) {
    await missingPiecesService.update(pieceId, data);

    setMissingPieces(
      missingPieces.map((piece) => {
        if (piece.piece_id === pieceId) {
          piece.collected = 0;
        }
        return piece;
      })
    );
  }

  function setColor(collected) {
    if (collected) {
      return "rgba(119, 242, 92,0.3)";
    }
    return "";
  }

  return (
    <Grid container justifyContent={"center"}>
      <TableContainer component={Paper} className="margin-md">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Kép</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Elem neve</TableCell>
              <TableCell>Darabszám</TableCell>
              <TableCell>Szín</TableCell>
              <TableCell>Beszerezve</TableCell>
              <TableCell>Törlés</TableCell>
              <TableCell>Beszerzés</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {missingPieces.length > 0
              ? missingPieces.map((missingPiece) => (
                  <TableRow key={missingPiece.piece_id}>
                    <TableCell
                      style={{
                        backgroundColor: setColor(
                          Boolean(missingPiece.collected)
                        ),
                      }}
                      align="left"
                    >
                      <img
                        style={{
                          height: 70,
                          width: 70,
                          objectFit: "contain",
                        }}
                        className="img-thumbnail"
                        src={missingPiece.image}
                        alt={missingPiece.name}
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: setColor(
                          Boolean(missingPiece.collected)
                        ),
                      }}
                      align="left"
                    >
                      {missingPiece.piece_id}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: setColor(
                          Boolean(missingPiece.collected)
                        ),
                      }}
                      align="left"
                    >
                      {missingPiece.name}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: setColor(
                          Boolean(missingPiece.collected)
                        ),
                      }}
                      align="left"
                    >
                      {missingPiece.quantity}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: setColor(
                          Boolean(missingPiece.collected)
                        ),
                      }}
                      align="left"
                    >
                      {missingPiece.color}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: setColor(
                          Boolean(missingPiece.collected)
                        ),
                      }}
                      align="left"
                    >
                      {Boolean(missingPiece.collected) ? "Igen" : "Nem"}
                    </TableCell>

                    <TableCell
                      style={{
                        backgroundColor: setColor(
                          Boolean(missingPiece.collected)
                        ),
                      }}
                      align="left"
                    >
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(missingPiece.piece_id)}
                        startIcon={<DeleteIcon />}
                      >
                        Elem végleges törlése
                      </Button>
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: setColor(
                          Boolean(missingPiece.collected)
                        ),
                      }}
                    >
                      {Boolean(missingPiece.collected) ? (
                        <Button
                          startIcon={<AssignmentTurnedInIcon />}
                          variant="contained"
                          onClick={() =>
                            handleCancellationCollected(missingPiece.piece_id, {
                              collected: false,
                            })
                          }
                        >
                          Elem beszerzésének visszavonása
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() =>
                            handleCollected(missingPiece.piece_id, {
                              collected: true,
                            })
                          }
                        >
                          Elem beszerezve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default PiecesTable;
