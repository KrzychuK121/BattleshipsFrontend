import 'bootstrap/dist/css/bootstrap.min.css';

import Modal from 'react-bootstrap/Modal';

import CreateLobby from './CreateLobby';

function LobbyManager() {
    return (
        <Modal
            show={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tworzenie lobby
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Stwórz lobby lub dołącz do przyjaciela</h4>
                <div>
                    <CreateLobby />
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default LobbyManager;