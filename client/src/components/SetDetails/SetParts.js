import { useEffect, useState } from "react";
import RebrickableService from "../../services/rebrickableService";
import {
  DataGrid,
  GridLinkOperator,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Button, Grid, Modal } from "@mui/material";
import MissingPiecesModal from "../MissingPieces/MissingPiecesModal";
import { Box } from "@mui/system";

const SetParts = ({ set_id }) => {
  const [rows, setRows] = useState([]);
  const [clickedImage, setClickedImage] = useState();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedParts, setSelectedParts] = useState([]);
  const [pageSize, setPageSize] = useState(50);
  const [selectedRows, setSelectedRows] = useState([]);

  const [addMissingPartsModal, setAddMissingPartsModal] = useState(false);
  const rebrickableService = new RebrickableService();

  useEffect(() => {
    async function getParts() {
      const parts = await rebrickableService.getSetParts(set_id);
      const rowData = parts.results.map((part) => {
        return {
          img: part.part.part_img_url,
          part_num: part.part.part_num,
          id: part.id,
          color: part.color.name,
          name: part.part.name,
          quantity: part.quantity,
          link: part.part.part_url,
        };
      });
      setRows(rowData);
    }
    getParts();
  }, []);

  const columns = [
    {
      field: "img",
      headerName: "Kép",
      width: 120,

      renderCell: (params) => (
        <img
          onClick={() => handleImageClick(params.value)}
          className="cursor-pointer object-contain	 h-[90px] w-[90px]"
          alt={params.row.name}
          src={params.value}
        />
      ),
    },
    { field: "part_num", headerName: "ID", width: 150 },
    { field: "name", headerName: "Név", width: 350 },
    { field: "quantity", headerName: "Darabszám", width: 150 },
    {
      field: "color",
      headerName: "Szín",
      width: 130,
    },
    {
      field: "link",
      headerName: "Link",
      width: 150,
      renderCell: (params) => (
        <a target="_blank" rel="noreferrer" href={params.value}>
          További információ
        </a>
      ),
    },
  ];

  function handleImageClick(image) {
    setImageModalOpen(true);
    setClickedImage(image);
  }

  function onSelectionModelChange(values) {
    setSelectedParts(values);
    const selectedRowsData = values.map((id) =>
      rows.find((row) => row.id === id)
    );
    setSelectedRows(selectedRowsData);
  }

  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter
          placeholder={"Keresés"}
          quickFilterParser={(searchInput) =>
            searchInput
              .split(",")
              .map((value) => value.trim())
              .filter((value) => value !== "")
          }
        />
      </Box>
    );
  }
  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={3}>
        <Button
          variant="contained"
          children={`Hiányzó elemek hozzáadása (${selectedParts.length})`}
          className="m-1"
          onClick={() => setAddMissingPartsModal(true)}
        />
      </Grid>
      <Grid container direction={"column"} className="h-[500px]">
        <DataGrid
          loading={rows.length === 0}
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[25, 50, 100]}
          checkboxSelection
          rowHeight={85}
          selectionModel={selectedParts}
          onSelectionModelChange={onSelectionModelChange}
          onPageSizeChange={(value) => setPageSize(value)}
          hideFooterSelectedRowCount={true}
          disableSelectionOnClick
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterLogicOperator: GridLinkOperator.Or,
              },
            },
          }}
          components={{ Toolbar: QuickSearchToolbar }}
        />

        <Modal
          open={imageModalOpen}
          onClose={() => setImageModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="w-full h-full flex items-center justify-center"
        >
          <img
            onClick={() => setImageModalOpen(true)}
            alt={clickedImage}
            src={clickedImage}
          />
        </Modal>

        <MissingPiecesModal
          selectedRows={selectedRows}
          setSelectedParts={setSelectedParts}
          addMissingPartsModal={addMissingPartsModal}
          setAddMissingPartsModal={setAddMissingPartsModal}
          setId={set_id}
        />
      </Grid>
    </Grid>
  );
};

export default SetParts;
