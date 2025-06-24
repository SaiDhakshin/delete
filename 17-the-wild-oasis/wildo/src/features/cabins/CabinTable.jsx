import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow'
import { useCabins } from "./useCabins";
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinsTable() {

  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if(isLoading) return <Spinner />

  // Filter
  const filteredValue = searchParams.get('discount') || 'all';

  let filteredCabins;
  if(filteredValue === 'all') filteredCabins = cabins;
  if(filteredValue === 'no-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0)
  }
  if(filteredValue === 'with-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0)
  }

  // SortBy
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split("-");
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a,b) => a[field] - b[field] * modifier)

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr" role="table">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={filteredCabins} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin}/>} />
        {/* {cabins.map(cabin => <CabinRow key={cabin.id} cabin={cabin}/>)} */}
      </Table>
    </Menus>
  )
}

export default CabinsTable
