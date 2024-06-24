import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import { HubContext } from '../../HubProvider/HubContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Button } from 'react-bootstrap';

import Board from '../board/Board';
import { FieldType } from '../board/Field';
import { isCellOccupiedPS } from '../initBoard/InitBoardPanel';

function GameBoardPanel() {
	const { conn } = useContext(HubContext);

	const [isGameStarting, setIsGameStarting] = useState(false);
	const [isMyTurn, setIsMyTurn] = useState(false);

	const [imTheWinner, setImTheWinner] = useState(false);
	const [winnerUsername, setWinnerUsername] = useState('');

	const [shotedCells, setShotedCells] = useState([]);
	const [highlightedCells, setHighlightedCells] = useState([]);
	const [myCustomFields, setMyCustomFields] = useState(new Map());
	const [opponentCustomFields, setOpponentCustomFields] = useState(new Map());

	const navigate = useNavigate();
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
					/*console.log('GetWhosFirstAndGameStatus');
					console.log('--------------------------');
					console.log(`isGameStarting: ${isGameStarting}`);
					console.log(`isMyTurn: ${isMyTurn}`);
					console.log('--------------------------');*/
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

	const isGameOver = () => {
		return winnerUsername !== '';
	}

	const isPlayerAllowedToShoot = () => {
		return isMyTurn && isGameStarting && !isGameOver();
	}

	const onClickAction = async (cellId) => {
		if (shotedCells.includes(cellId))
			return;

		setShotedCells([...shotedCells, cellId]);
		setHighlightedCells([]);

		if (conn != null) {
			await conn.invoke(
				'MakeMove',
				cellId
			);
		}
			
	};

	const onHoverAction = (i, j) => {
		const cellId = `${i}:${j}`;

		if (shotedCells.includes(cellId))
			return;

		setHighlightedCells([cellId]);
	};

	const onHoverOutAction = () => {
		setHighlightedCells([]);
	};

	const backToLobbyHandler = async () => {
		if (!isGameOver())
			return;

		if (conn == null)
			return;

		await conn.invoke(
			'LeaveSpecificLobby'
		);
		await conn.stop();

		navigate('/lobby');
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
							isPlayerAllowedToShoot()
							? onClickAction
							: null
						}
						onCellHoverHandler={
							isPlayerAllowedToShoot()
							? onHoverAction
							: null
						}
						onCellOutHandler={
							isPlayerAllowedToShoot()
							? onHoverOutAction
							: null
						}
						highlightedCells={
							isPlayerAllowedToShoot()
							? highlightedCells
							: null
						}
					/>
				</Col>
			</Row>
			<Row className='justify-content-center'>
				<Col md={6}>
					{
						!isGameOver() &&
						<div>
							<h2>Kogo ruch?</h2>
							<span>{isMyTurn ? 'Twoja kolej' : 'Poczekaj na ruch przeciwnika'}</span>
						</div>
					}
					{
						isGameOver() &&
						<div>
							<Row>
								<h2>{imTheWinner ? 'Wygrałeś' : 'Przegrałeś'}</h2>
								<span>Gracz {winnerUsername} wygrywa grę. Gratulacje!</span>
							</Row>
							<Row>
								<Button sm={1} variant='primary' onClick={backToLobbyHandler}>
									Powrót do menu
								</Button>
							</Row>
						</div>						
					}
					
				</Col>
			</Row>
		</Container>
	);
}

export default GameBoardPanel;