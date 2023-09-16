import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import MissingPiecesService from "../../services/missingPiecesService";
import { useState } from "react";

const MissingPiecesModal = ({
  selectedParts,
  addMissingPartsModal,
  setAddMissingPartsModal,
}) => {

  const [missingPieceCount, setMissingPieceCount] = useState(0);
  const missingPiecesService = new MissingPiecesService();

  async function handleSave() {
    await missingPiecesService.store({
      id: selectedParts.id,
      part_num: selectedParts.part_num,
      img: selectedParts.img,
      quantity: missingPieceCount,
      name: selectedParts.name,
      link: selectedParts.link,
      color: selectedParts.color,
    });
    setAddMissingPartsModal(false);
  }

  return (
    <Dialog
      maxWidth="md"
      open={addMissingPartsModal}
      onClose={() => setAddMissingPartsModal(false)}
    >
      <DialogTitle>{"Hiányzó elem hozzáadása"}</DialogTitle>
      <DialogContent>


        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Kép</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Név</TableCell>
                <TableCell>Szín</TableCell>
                <TableCell>Hiányzó darabok</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow>
                <TableCell>
                  <Box height={80} width={80}>
                    <img
                      className="img-thumbnail"
                      alt={selectedParts.name}
                      src={selectedParts.img}
                    />
                  </Box>
                </TableCell>
                <TableCell>{selectedParts.id}</TableCell>
                <TableCell>{selectedParts.name}</TableCell>
                <TableCell>{selectedParts.color}</TableCell>
                <TableCell >
                  <TextField value={missingPieceCount} onChange={(e) => setMissingPieceCount(e.target.value)} type="number" />
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>

      </DialogContent>
      <DialogActions className="flex !justify-start">
        <Button
          onClick={handleSave}
          className="!m-3"
          children={"Mentés"}
          variant="contained"
          startIcon={<SaveIcon />}
        />
      </DialogActions>
    </Dialog>
  );
};

export default MissingPiecesModal;
