import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Modal, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MissingPiecesService from "../../services/missingPiecesService";
import CancelIcon from '@mui/icons-material/Cancel';
import StyledButton from "../StyledButton.js";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const PiecesTable = ({ missingPieces, setMissingPieces, selectedSetId }) => {

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [clickedImage, setClickedImage] = useState();


  const missingPiecesService = new MissingPiecesService();

  async function handleDelete() {
    await missingPiecesService.delete(selectedItem);

    setMissingPieces(
      missingPieces.filter((piece) => piece.id !== selectedItem)
    );
    setOpenConfirmationDialog(false);
  }

  async function handleCollected(pieceId, data) {
    await missingPiecesService.update(pieceId, data);

    setMissingPieces(
      missingPieces.map((piece) => {
        if (piece.id === pieceId) {
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
        if (piece.id === pieceId) {
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

  function handleImageClick(image) {
    setImageModalOpen(true);
    setClickedImage(image);
  }
  return (
    <Grid className="mt-[116px]" container justifyContent={"center"}>
      <TableContainer component={Paper} className="margin-md">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Kép</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Set azonsító</TableCell>
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
              ? missingPieces.map((missingPiece) => {
                if (selectedSetId === missingPiece.set_num || selectedSetId === "") {
                  return (
                    <TableRow key={missingPiece.id}>
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
                          className="img-thumbnail cursor-pointer"
                          onClick={() => handleImageClick(missingPiece.img)}
                          src={missingPiece.img}
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
                        {missingPiece.id}
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: setColor(
                            Boolean(missingPiece.collected)
                          ),
                        }}
                        align="left"
                      >
                        {missingPiece.set_num}
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
                        <Tooltip title=" Elem végleges törlése">
                          <DeleteIcon className="cursor-pointer" onClick={() => {
                            setSelectedItem(missingPiece.id)
                            setOpenConfirmationDialog(true)
                          }} />
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: setColor(
                            Boolean(missingPiece.collected)
                          ),
                        }}
                      >
                        {Boolean(missingPiece.collected) ? (
                          <Tooltip title="Hiányzó elem">
                            <CancelIcon className="cursor-pointer" onClick={() => handleCancellationCollected(missingPiece.id, {
                              collected: false,
                            })} />
                          </Tooltip>

                        ) : (
                          <Tooltip title="Elem beszerezve">
                            <CheckBoxIcon className="cursor-pointer" onClick={() => handleCollected(missingPiece.id, {
                              collected: true,
                            })} />
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                }
              })
              : <TableRow></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="w-full h-full flex items-center justify-center"
      >
        <img
          className="cursor-pointer"
          onClick={() => setImageModalOpen(true)}
          alt={clickedImage}
          src={clickedImage}
        />
      </Modal>

      <Dialog
        open={openConfirmationDialog}
        onClose={() => setOpenConfirmationDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Törlés"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Biztosan ki szeretnéd törölni ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton
            variant="contained"
            icon={<DeleteIcon />}
            onClick={handleDelete}
            className="margin-sm"
          >Törlés</StyledButton>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PiecesTable;
