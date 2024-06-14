import 'bootstrap/dist/css/bootstrap.min.css';

import PlainBoard from './PlainBoard';
import { FieldType } from './Field';

function Board() {
    
    return (
        <PlainBoard rowsCount={10} colsCount={10} fieldType={FieldType.NOT_HITTED} />
    );
}

export default Board;