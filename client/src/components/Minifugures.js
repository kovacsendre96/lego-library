import { useQuery } from "react-query";
import RebrickableService from "../services/rebrickableService";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconButton, MenuItem, Modal, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MissingPiecesModal from "./MissingPieces/MissingPiecesModal";


const Minifigures = () => {

    const { id } = useParams();
    const rebrickableService = new RebrickableService();

    const [minifigures, setMinifigures] = useState([]);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [clickedImage, setClickedImage] = useState();
    const [selectedParts, setSelectedParts] = useState({});
    const [addMissingPartsModal, setAddMissingPartsModal] = useState(false);


    const { data, isLoading } = useQuery("minifigures", () => rebrickableService.getMinifigsById(id));

    function handleImageClick(image) {
        setImageModalOpen(true);
        setClickedImage(image);
    }

    function handleAddClick(part) {
        setSelectedParts(part);
        setAddMissingPartsModal(true)
    }

    useEffect(() => {
        if (data) {
            setMinifigures(data.results);
        }
    }, [data, isLoading])

    if (!minifigures.length && !data) {
        return (
            <TableContainer component={Paper} className="!overflow-visible">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Hozzáadás </TableCell>
                            <TableCell> Kép</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell> Név</TableCell>
                            <TableCell> Darabszám</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="h-[300px]">
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <div>
            <TableContainer component={Paper} className="!overflow-visible">
                <div className="flex items-center justify-between w-full bg-yellow-gradient p-3 sticky z-10" style={{ top: document.getElementById("navBar").clientHeight }}>
                    <div className="flex items-center">

                        <h3>Összes darabszám:  {data.count}</h3>
                    </div>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Hozzáadás </TableCell>
                            <TableCell> Kép</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell> Név</TableCell>
                            <TableCell> Darabszám</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.count === 0 ?
                            <TableRow >
                                <TableCell className="h-[300px]">Ehez a szetthez nem tartozik minifigura</TableCell>
                            </TableRow>
                            : minifigures.map((row, index) => (
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
                                    <TableCell align="left" component="th" scope="row">
                                        <img className="sm:h-20 sm:w-20 object-contain cursor-pointer" onClick={() => handleImageClick(row.set_img_url)} src={row.set_img_url} alt={row.name} />

                                    </TableCell>
                                    <TableCell align="left">{row.id}</TableCell>
                                    <TableCell align="left">{row.set_name}</TableCell>
                                    <TableCell align="left">{row.quantity}</TableCell>
                                    <TableCell align="left">{row.color}</TableCell>
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
                    minifigures={true}
                    setSelectedParts={setSelectedParts}
                    selectedParts={selectedParts}
                    addMissingPartsModal={addMissingPartsModal}
                    setAddMissingPartsModal={setAddMissingPartsModal}
                    setId={id}
                />
            }
        </div >
    );
};

export default Minifigures;