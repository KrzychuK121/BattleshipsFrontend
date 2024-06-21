import { useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import { HubContext } from '../../HubProvider/HubContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';

import Board from '../board/Board';
import { isCellOccupiedPS } from '../initBoard/InitBoardPanel';

function GameBoardPanel() {
	const { conn } = useContext(HubContext);

	const location = useLocation();
	const { state } = location || {};
	const { placedShips, boardSize } = state || {};

	useEffect(
		() => {
			if (conn == null)
				return;

			//conn.on('');
		}, [conn]
	);

	const isCellOccupied = (cellId) => {
		return isCellOccupiedPS(placedShips, cellId);
	};

	return (
		<Container>
			<Row className='justify-content-center'>
				<Col md={5}>
					<h2>
						Twoja plansza
					</h2>
					<Board
						boardSize={boardSize}
						isCellOccupied={isCellOccupied}
					/>
				</Col>
				<Col md={5}>
					<h2>
						Plansza przeciwnika
					</h2>
					<Board
						boardSize={boardSize}
					/>
				</Col>
			</Row>
			<Row className='justify-content-center'>
				<Col md={6}>
				</Col>
			</Row>
		</Container>
	);
}

export default GameBoardPanel;