import { Modal } from 'react-bootstrap';

const CustomModal = ({ show, title, body, footer, onHide }) => {
    console.log("Custom Modal rendered ==");
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                {footer}
            </Modal.Footer>
        </Modal>
    )
}

export default CustomModal;