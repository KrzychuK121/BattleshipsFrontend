import 'bootstrap/dist/css/bootstrap.min.css';

function Field({
	type,
	onCellHoverHandler,
	onCellOutHandler,
	onCellClickHandler
}) {
	return (
		<td
			className='px-3 py-3'
			style={{ backgroundColor: type }}
			onMouseOver={onCellHoverHandler}
			onMouseOut={onCellOutHandler}
			onClick={onCellClickHandler}
		></td>
	);
}

const FieldType = {
	HOVERED: 'yellow',
	MISSED: 'lightblue',
	HITTED: 'red',
	SUNKEN: 'grey',
	NOT_HITTED: 'blue', 
	SHIP: 'green'
};

export default Field;
export { FieldType };