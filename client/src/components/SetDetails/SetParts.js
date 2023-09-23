import { useEffect, useState } from "react";
import RebrickableService from "../../services/rebrickableService";
import { Grid, IconButton, MenuItem, Modal, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import MissingPiecesModal from "../MissingPieces/MissingPiecesModal";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const SetParts = ({ set_id }) => {
  const [rows, setRows] = useState([]);
  const [clickedImage, setClickedImage] = useState();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedParts, setSelectedParts] = useState({});
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [addMissingPartsModal, setAddMissingPartsModal] = useState(false);
  const rebrickableService = new RebrickableService();

  async function getParts(page, pageSize) {
    const parts = await rebrickableService.getSetParts(set_id, page, pageSize);
    const rowData = parts.results.map((part) => {
      console.log(part.set_num);
      return {
        img: part.part.part_img_url,
        set_num: part.set_num,
        id: part.id,
        color: part.color.name,
        name: part.part.name,
        quantity: part.quantity,
        link: part.part.part_url,
      };
    });
    setCount(parts.count);
    setRows(rowData);
  }

  useEffect(() => {
    getParts(page, pageSize);
  }, []);



  const columns = [
    {
      field: "missing_piece", headerName: "Hozzáadás",
    },
    {
      field: "img", headerName: "Kép",
    },
    {
      field: "part_id", headerName: "ID",
    },
    {
      field: "name", headerName: "Név",
    },
    {
      field: "quantity", headerName: "Darabszám",
    },
    {
      field: "color", headerName: "Szín",
    },
    {
      field: "link", headerName: "Link",
    },
  ];

  function handleImageClick(image) {
    setImageModalOpen(true);
    setClickedImage(image);
  }

  function handlePaginationChange(event, value) {

    setPage(value);
    getParts(value, pageSize);
  };

  function handlePageSizeChange(e) {
    const value = e.target.value;
    setPageSize(value);
    getParts(page, value);
  }

  function handleAddClick(part) {
    setSelectedParts(part);
    setAddMissingPartsModal(true)
  }
  return (
    <Grid className="mt-10 relative" container>
      <TableContainer component={Paper} className="!overflow-visible">
        <div className="flex items-center justify-between w-full bg-yellow-gradient p-3 sticky z-10" style={{ top: document.getElementById("navBar").clientHeight }}>
          <div className="flex items-center">
            <Select className="mr-3" value={pageSize} onChange={handlePageSizeChange}>
              <MenuItem disabled={Math.ceil(count / 10) < page ? true : false} value="10" >10</MenuItem>
              <MenuItem disabled={Math.ceil(count / 25) < page ? true : false} value="25" >25</MenuItem>
              <MenuItem disabled={Math.ceil(count / 50) < page ? true : false} value="50" >50</MenuItem>
              <MenuItem disabled={Math.ceil(count / 100) < page ? true : false} value="100" >100</MenuItem>
            </Select>
            <h3>találtok száma: {rows.length}</h3>
          </div>
          <Pagination page={page} count={Math.ceil(count / pageSize)} onChange={handlePaginationChange} />
        </div>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(column =>
              (<TableCell key={column.field}>
                {column.headerName}
              </TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={`${row.name}-${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell onClick={() => handleAddClick(row)}>
                  <Tooltip title="Hiányzó elem hozzáadása">
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell component="th" scope="row">
                  <img className="sm:h-20 sm:w-20 object-contain cursor-pointer" onClick={() => handleImageClick(row.img)} src={row.img} alt={row.name} />

                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.color}</TableCell>
                <TableCell align="right"><Link to={`${row.link}`} >További infó</Link></TableCell>
              </TableRow>
            ))}
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
      {addMissingPartsModal &&
        <MissingPiecesModal
          setSelectedParts={setSelectedParts}
          selectedParts={selectedParts}
          addMissingPartsModal={addMissingPartsModal}
          setAddMissingPartsModal={setAddMissingPartsModal}
          setId={set_id}
        />
      }
    </Grid>
  );
};

export default SetParts;
