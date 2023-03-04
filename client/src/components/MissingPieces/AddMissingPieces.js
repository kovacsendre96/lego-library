import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageIcon from '@mui/icons-material/Image';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ExtensionIcon from '@mui/icons-material/Extension';
import TagIcon from '@mui/icons-material/Tag';
import SaveIcon from '@mui/icons-material/Save';
import { sendData } from "../../Helpers/axios";
import SetSelector from "./SetSelector";


const AddMissingPieces = ({ legoData, setLegoData, missingPiecesList, setMissingPiecesList, from, listOfAllLegoSet }) => {
    const [img, setImg] = useState('');
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [color, setColor] = useState('');
    const [setSelectorValue, setSetSelectorValue] = useState({ id: '', name: 'Válassz' });

    const [imgError, setImgError] = useState(null);
    const [idError, setIdError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [numberError, setNumberError] = useState(null);
    const [colorError, setColorError] = useState(null);
    const [setSelectorError, setSetSelectorError] = useState(null);

    const [formObject, setFormObject] = useState(null);

    const stateArray = [
        img, id, name, number, color, setSelectorValue
    ];

    useEffect(() => {
        if (imgError === false && nameError === false && numberError === false && colorError === false && idError === false) {
            setImg('');
            setName('');
            setNumber('');
            setColor('');
            setId('');
            setSetSelectorValue('');
            if (from === 'missing-pieces-page' && setSelectorError === false) {
                sendData('POST', `https://lego-project-da06d-default-rtdb.firebaseio.com/${formObject.setId}/missing_pieces.json`, formObject, afterPutMissingData);
            } else {
                sendData('POST', `https://lego-project-da06d-default-rtdb.firebaseio.com/${legoData.id}/missing_pieces.json`, formObject, afterPutMissingData);
            }
        }
    }, [formObject]);

    const afterPutMissingData = (response) => {
        if (response.status === 200) {
            setMissingPiecesList([...missingPiecesList, formObject]);
        }
    };

    const HandleImgChange = (e) => {
        const target = e.target.value;
        setImg(target);
    };
    const HandleIdChange = (e) => {
        const target = e.target.value;
        setId(target);
    };
    const HandleNameChange = (e) => {
        const target = e.target.value;
        setName(target);
    };
    const HandleNumberChange = (e) => {
        const target = e.target.value;
        setNumber(target);
    };
    const HandleColorChange = (e) => {
        const target = e.target.value;
        setColor(target);
    };
    const HandleSetSelectorChange = (e, a) => {
        const target = a;
        setSetSelectorValue(target);
    };

    const inputsArray = [
        {
            icon: <ImageIcon />,
            id: 'missing_pieces_img',
            text: 'Kép',
            error: imgError,
            value: img,
            onChange: HandleImgChange,
            type: 'text'
        },
        {
            icon: <TagIcon />,
            id: 'missing_pieces_id',
            text: 'Cikkszám',
            error: idError,
            value: id,
            onChange: HandleIdChange,
            type: 'text'
        },
        {
            icon: <LocalOfferIcon />,
            id: 'missing_pieces_name',
            text: 'Megnevezés',
            error: nameError,
            value: name,
            onChange: HandleNameChange,
            type: 'text'
        },
        {
            icon: <ExtensionIcon />,
            id: 'missing_pieces_number',
            text: 'Darabszám',
            error: numberError,
            value: number,
            onChange: HandleNumberChange,
            type: 'number'
        },
        {
            icon: <ColorLensIcon />,
            id: 'missing_pieces_color',
            text: 'Szín',
            error: colorError,
            value: color,
            onChange: HandleColorChange,
            type: 'text'
        },
    ];

    const handleButtonClick = () => {
        let missingObject = {};

        stateArray.forEach((data, index) => {
            if (index === 0) {
                if (data.match('toysperiod')) {
                    alert('A toypseriod képei nem hivatkozhatók')
                    setImgError(true);
                    return;
                }
                if (data !== '') {
                    missingObject.img = data;
                    setImgError(false);
                } else {
                    setImgError(true);
                }
            }
            if (index === 1) {
                if (data !== '') {
                    missingObject.id = id;
                    setIdError(false);
                } else {
                    setIdError(true);
                }
            }
            if (index === 2) {
                if (data !== '') {
                    missingObject.name = data;
                    setNameError(false);
                } else {
                    setNameError(true);
                }
            }
            if (index === 3) {
                if (data !== '') {
                    missingObject.piece = data;
                    setNumberError(false);
                } else {
                    setNumberError(true);
                }
            }
            if (index === 4) {
                if (data !== '') {
                    missingObject.color = data;
                    setColorError(false);
                } else {
                    setColorError(true);
                }
            }
            if (index === 5) {
                if (data.name !== 'Válassz') {
                    missingObject.setId = data.id;
                    setSetSelectorError(false);
                } else {
                    setSetSelectorError(true);
                }
            }
        });
        setFormObject(missingObject);
    };
    return (
        <Grid container justifyContent={'center'}>
            {from === 'missing-pieces-page' &&
                <Grid key={'0-0'} item xs={12} sm={4} md={2} container justifyContent={'center'}>
                    <SetSelector
                        listOfAllLegoSet={listOfAllLegoSet}
                        setSelectorValue={setSelectorValue}
                        setSelectorError={setSelectorError}
                        HandleSetSelectorChange={HandleSetSelectorChange}
                    />
                </Grid>
            }
            {inputsArray.map((data, index) => (
                <Grid key={index} item xs={12} sm={4} md={2} container justifyContent={'center'}>
                    <TextField
                        type={data.type}
                        id={data.id}
                        error={data.error}
                        label={data.text}
                        variant="outlined"
                        key={`missing-pieces-input-${index}`}
                        value={data.value}
                        onChange={data.onChange}
                        className="margin-sm"
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    {data.icon}
                                </InputAdornment>
                        }}
                    />
                </Grid>

            ))}
            <Button variant="contained"
                children={'Mentés'}
                onClick={handleButtonClick}
                className="margin-sm"
                startIcon={<SaveIcon/>}

            />
        </Grid>
    );
};

export default AddMissingPieces;
