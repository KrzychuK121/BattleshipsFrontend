import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import { HubContext } from '../../HubProvider/HubContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';

import Board from '../board/Board';
import { FieldType } from '../board/Field';
import { isCellOccupiedPS } from '../initBoard/InitBoardPanel';

function GameBoardPanel() {
	const { conn } = useContext(HubContext);

	const [isGameStarting, setIsGameStarting] = useState(false);
	const [isMyTurn, setIsMyTurn] = useState(false);

	const [imTheWinner, setImTheWinner] = useState(false);
	const [winnerUsername, setWinnerUsername] = useState(false);

	const [shotedCells, setShotedCells] = useState([]);
	const [myCustomFields, setMyCustomFields] = useState(new Map());
	const [opponentCustomFields, setOpponentCustomFields] = useState(new Map());

	const location = useLocation();
	const { state } = location || {};
	const { placedShips, boardSize } = state || {};

	useEffect(
		() => {
			if (conn == null)
				return;

			const checkWhosFirstAndGameStatus = async () => {
				await conn.invoke(
					'CheckGameStatus'
				);
			}

			conn.on(
				'GetWhosFirstAndGameStatus',
				(isGameStarting, isMyTurn) => {
					setIsGameStarting(isGameStarting);
					setIsMyTurn(isMyTurn);
				}
			);

			conn.on(
				'PlayerShotted',
				(lastSenderConnId, cellId, isHitted) => { 
					const type = isHitted
						? FieldType.HITTED
						: FieldType.MISSED;

					if (isMyTurn)
						setOpponentCustomFields(opponentCustomFields.set(cellId, type));
					else
						setMyCustomFields(myCustomFields.set(cellId, type));

					setIsMyTurn(
						lastSenderConnId !== conn.connectionId
					);
				}
			);

			conn.on(
				'PlayerSunkenShip',
				(lastSenderConnId, cellsIds) => {
					const type = FieldType.SUNKEN;

					if (isMyTurn)
						cellsIds.forEach(
							cellId => setOpponentCustomFields(
								opponentCustomFields.set(cellId, type)
							)
						);
					else
						cellsIds.forEach(
							cellId => setMyCustomFields(
								myCustomFields.set(cellId, type)
							)
						);						

					setIsMyTurn(
						lastSenderConnId !== conn.connectionId
					);
				}
			);

			conn.on(
				'PlayerWon',
				(winnerConnId, winnerUsername) => {
					setImTheWinner(conn.connectionId === winnerConnId);
					setWinnerUsername(winnerUsername);
				}
			);

			if (!isGameStarting)
				checkWhosFirstAndGameStatus();

			return () => {
				conn.off('GetWhosFirstAndGameStatus');
				conn.off('PlayerShotted');
				conn.off('PlayerSunkenShip');
				conn.off('PlayerWon');
			};
		}, [conn, isMyTurn]
	);

	const isCellOccupied = (cellId) => {
		return isCellOccupiedPS(placedShips, cellId);
	};

	const onClickAction = async (cellId) => {
		if (shotedCells.includes(cellId))
			return;

		setShotedCells([...shotedCells, cellId]);

		if (conn != null) {
			await conn.invoke(
				'MakeMove',
				cellId
			);
		}
			
	};

	const onHoverAction = () => {

	};

	const onHoverOutAction = () => {

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
						customFields={myCustomFields}
					/>
				</Col>
				<Col md={5}>
					<h2>
						Plansza przeciwnika
					</h2>
					<Board
						boardSize={boardSize}
						customFields={opponentCustomFields}
						onCellClickHandler={
							isMyTurn && isGameStarting
							? onClickAction
							: null
						}
					/>
				</Col>
			</Row>
			<Row className='justify-content-center'>
				<Col md={6}>
					<span>{isMyTurn ? 'Twoja kolej' : 'Poczekaj na ruch przeciwnika'}</span>
				</Col>
			</Row>
		</Container>
	);
}

export default GameBoardPanel;