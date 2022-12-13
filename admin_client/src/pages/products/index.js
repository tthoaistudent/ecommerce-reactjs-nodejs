import { Grid, Chip, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import in project
import productApi from 'apis/product';
import { coventRowData } from 'utils/functions';
import ConfirmModal from 'components/modals/ConfirmModal';

const Product = () => {
    const [rows, setRow] = useState([]);
    const [openModel, setOpenModel] = useState(false);
    const [deleteID, setDelete] = useState(null);

    const fetch = async () => {
        await productApi.getAll().then((res) => {
            if (res) {
                setRow(coventRowData(res));
            }
        });
    };

    const handleDelete = async () => {
        await productApi.delete(deleteID).then((res) => {
            if (res) {
                fetch();
                handleClose();
            }
        });
    };

    const confirmDelete = (id) => {
        setOpenModel(true);
        setDelete(id);
    };

    const handleClose = () => {
        setOpenModel(false);
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, hide: true },
        { field: 'stt', headerName: 'STT', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'price', headerName: 'Price', flex: 1 },
        { field: 'thumnail', headerName: 'Thumnail', flex: 1 },
        {
            field: 'status',
            type: 'actions',
            headerName: 'Status',
            renderCell: (params) => {
                if (params.row.status === 1) {
                    return <Chip label="Show" color="primary" variant="outlined" />;
                } else {
                    return <Chip label="Hide" color="warning" variant="outlined" />;
                }
            }
        },
        {
            field: 'actions',
            type: 'actions',
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem icon={<EditIcon />} label="Update" showInMenu />,
                <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => confirmDelete(params.row.id)} showInMenu />
            ]
        }
    ];

    useEffect(() => {
        fetch();
    }, []);

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Typography variant="h5">Dashboard</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
                </div>
            </Grid>
            <ConfirmModal open={openModel} onClose={handleClose} onDelete={handleDelete} />
        </>
    );
};

export default Product;
