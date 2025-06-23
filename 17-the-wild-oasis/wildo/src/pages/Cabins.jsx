import CabinsTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

function Cabins() {

  return (
    <>
        <Row type="horizontal">
            <Heading as="h1">All cabins</Heading>
            <p>Filter / sort</p>
        </Row>
        <CabinsTable />
        <AddCabin />
    </>
  );
}

export default Cabins;
