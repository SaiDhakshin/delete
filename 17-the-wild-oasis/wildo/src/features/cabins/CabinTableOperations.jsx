import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter';

function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter filterField='discount' options={[
                {value: 'all', label: 'All'},
                {value: 'no-discount', label: 'no-discount'},
                {value: 'with-discount', label: 'with-discount'}
            ]}/>
        </TableOperations>
    )
}

export default CabinTableOperations;