import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { HubContext } from '../../HubProvider/HubContext';

import { Form, Row, Col, Button } from 'react-bootstrap';

function CreateLobby() {
    const [username, setUsername] = useState();
    const [chatConnection, setChatConnection] = useState();

    const navigate = useNavigate();
    const { joinLobby } = useContext(HubContext);

    return (
        <Form onSubmit={
            async (e) => {
                e.preventDefault();
                await joinLobby(username, chatConnection);
                navigate('/initBoard');
            }
        }>
            <Row className='px-5 py-5'>
                <Col sm={10}>
                    <Form.Group>
                        <Form.Control
                            className='my-2'
                            placeholder='Nazwa uzytkownika'
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Control
                            className='my-2'
                            placeholder='Nazwa pokoju'
                            onChange={e => setChatConnection(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Utworz pokoj
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default CreateLobby;