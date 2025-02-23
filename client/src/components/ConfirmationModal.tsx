import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Required for accessibility

const ConfirmationModal = ({ isOpen, onClose, onConfirm, item }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Confirm Deletion"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete <strong>{item}</strong> from your portfolio?</p>
            <div className="modal-actions">
                <button onClick={onClose}>Cancel</button>
                <button onClick={onConfirm}>Confirm</button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
