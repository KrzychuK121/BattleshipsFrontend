import 'bootstrap/dist/css/bootstrap.min.css';

function Field({ type }) {
	return (
		<td
			className='px-4 py-4'
			style={{ backgroundColor: type }}
		></td>
	);
}

const FieldType = {
	MISSED: 'lightblue',
	HITTED: 'red',
	SUNKEN: 'grey',
	NOT_HITTED: 'blue', 
	SHIP: 'green'
};

export default Field;
export { FieldType };