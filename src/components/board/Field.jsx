import 'bootstrap/dist/css/bootstrap.min.css';

function Field({ type }) {
	return (
		<td className='px-4 py-4'></td>
	);
}

const FieldType = {
	MISSED: 'lightblue',
	HITTED: 'red',
	SUNKEN: 'grey',
	NOT_HITTED: 'blue'
};

export default Field;
export { FieldType };