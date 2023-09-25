import {
  Box,
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
import StyledButton from "../StyledButton";
import { useParams } from "react-router-dom";

const MissingPiecesModal = ({
  selectedParts,
  addMissingPartsModal,
  setAddMissingPartsModal,
  minifigures
}) => {

  const [missingPieceCount, setMissingPieceCount] = useState(1);
  const missingPiecesService = new MissingPiecesService();

  const { id } = useParams();
  console.log(selectedParts);

  async function handleSave() {
    if (minifigures) {
      await missingPiecesService.store({
        id: selectedParts.id,
        set_num: id,
        img: selectedParts.set_img_url,
        quantity: missingPieceCount,
        name: selectedParts.set_name,
        link: "",
        color: "",
        collected: false
      });

    } else {

      await missingPiecesService.store({
        id: selectedParts.id,
        set_num: selectedParts.set_num,
        img: selectedParts.img,
        quantity: missingPieceCount,
        name: selectedParts.name,
        link: selectedParts.link,
        color: selectedParts.color,
        collected: false
      });
    }
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
                {!minifigures && <TableCell>Szín</TableCell>}
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
                      src={minifigures ? selectedParts.set_img_url : selectedParts.img}
                    />
                  </Box>
                </TableCell>
                <TableCell>{selectedParts.id}</TableCell>
                <TableCell>{minifigures ? selectedParts.set_name : selectedParts.name}</TableCell>
                {!minifigures && <TableCell>{selectedParts.color}</TableCell>}
                <TableCell >
                  <TextField autoFocus value={missingPieceCount} onChange={(e) => setMissingPieceCount(e.target.value)} type="number" />
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>

      </DialogContent>
      <DialogActions className="flex !justify-start">
        <StyledButton
          onClick={handleSave}
          className="!m-3"
          children={"Mentés"}
          variant="contained"
          icon={<SaveIcon />}
        />
      </DialogActions>
    </Dialog>
  );
};

export default MissingPiecesModal;
