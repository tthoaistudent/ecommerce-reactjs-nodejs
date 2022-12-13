import { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box, Chip } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// import in project
import categoryApi from 'apis/category';
import { coventRowData } from 'utils/functions';
import CreateModal from './components/CreateModal';
import ConfirmModal from './components/ConfirmModal';
import UpdateModal from './components/UpdateModal';

const Category = () => {
    const [rows, setRow] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [deleteID, setDelete] = useState(null);
    const [update, setUpdate] = useState(null);

    const fetch = async () => {
        await categoryApi.getAll().then((res) => {
            if (res) {
                setRow(coventRowData(res));
            }
        });
    };

    const handleOpen = () => {
        setOpenCreate(true);
    };

    const handleClose = () => {
        setOpenCreate(false);
        setOpenConfirm(false);
        setUpdate(null);
    };

    const handleSave = async (data) => {
        if (update) {
            await categoryApi.update(update._id, data).then((res) => {
                if (res) {
                    fetch();
                    handleClose();
                }
            });
        } else {
            await categoryApi.create(data).then((res) => {
                if (res) {
                    fetch();
                    handleClose();
                }
            });
        }
    };

    const confirmDelete = async (id) => {
        setOpenConfirm(true);
        setDelete(id);
    };

    const handleDelete = async () => {
        await categoryApi.delete(deleteID).then((res) => {
            if (res) {
                fetch();
                setDelete(null);
                handleClose();
            }
        });
    };

    const handleUpdate = async (id) => {
        await categoryApi.getOne(id).then((res) => {
            if (res) {
                setUpdate(res);
            }
        });
    };

    useEffect(() => {
        fetch();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'stt', headerName: 'STT', flex: 1 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'slug', headerName: 'Slug', flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            type: 'actions',
            flex: 1,
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
            getActions: (params) => [
                <GridActionsCellItem
                    key="update"
                    onClick={() => handleUpdate(params.row.id)}
                    icon={<EditIcon />}
                    label="Update"
                    showInMenu
                />,
                <GridActionsCellItem
                    key="edit"
                    onClick={() => confirmDelete(params.row.id)}
                    icon={<DeleteIcon />}
                    label="Delete"
                    showInMenu
                />
            ]
        }
    ];

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Typography variant="h5">Categories</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="outlined" onClick={handleOpen} startIcon={<AddIcon />}>
                            Create category
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
                    </div>
                </Grid>
            </Grid>
            <CreateModal open={openCreate} onClose={handleClose} onSave={handleSave} />
            <ConfirmModal open={openConfirm} onClose={handleClose} onDelete={handleDelete} />
            {update != null && <UpdateModal open={update != null} onClose={handleClose} onSave={handleSave} data={update} />}
        </>
    );
};

export default Category;
