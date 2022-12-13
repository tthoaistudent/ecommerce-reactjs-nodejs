import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@material-ui/core';
import { convertToSlug } from 'utils/functions';

const useStyles = makeStyles(() => ({
    root: {
        '& .MuiPaper-root': {
            width: '500px'
        }
    }
}));

const UpdateModal = (props) => {
    const { open, onClose, onSave, data } = props;
    const classes = useStyles();
    const [title, setTitle] = useState(data.title || '');
    const [slug, setSlug] = useState(data.slug || '');
    const [status, setStatus] = useState(data.status);
    const handleClose = () => {
        onClose();
        setTitle('');
        setSlug('');
        setStatus(1);
    };

    const handleSubmit = () => {
        onSave({ title, slug, status });
    };

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
        setSlug(convertToSlug(event.target.value));
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} className={classes.root}>
                <DialogTitle>Create Category</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        value={title}
                        onChange={handleChangeTitle}
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        value={slug}
                        onChange={(event) => setSlug(event.target.value)}
                        label="Slug"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        select
                        label="Status"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        fullWidth
                        variant="standard"
                    >
                        <MenuItem value={0}>Ẩn</MenuItem>
                        <MenuItem value={1}>Hiện</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

UpdateModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    data: PropTypes.object
};

export default UpdateModal;
