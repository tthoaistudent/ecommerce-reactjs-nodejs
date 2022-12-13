import {} from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const ConfirmModal = (props) => {
    const { open, onClose, onDelete } = props;

    const handleClose = () => {
        onClose();
    };

    const handleDelete = () => {
        onDelete();
    };
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Confirm delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Are you sure you want to delete this item?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleDelete}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

ConfirmModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onDelete: PropTypes.func
};

export default ConfirmModal;
