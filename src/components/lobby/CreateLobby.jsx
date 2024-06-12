import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

function CreateLobby({ joinLobby }) {
    const [username, setUsername] = useState();
    const [chatConnection, setChatConnection] = useState();

    return (
        <Form onSubmit={
            e => {
                e.preventDefault();
                joinLobby(username, chatConnection);
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
                    <Button variant='primary' type='submit'>Utworz pokoj</Button>
                </Col>
            </Row>
        </Form>
    );
}

export default CreateLobby;