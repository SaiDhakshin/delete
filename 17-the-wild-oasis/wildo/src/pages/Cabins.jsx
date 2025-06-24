import CabinsTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {

  return (
    <>
        <Row type="horizontal">
            <Heading as="h1">All cabins</Heading>
            <p>Filter / sort</p>
            <CabinTableOperations />
        </Row>
        <CabinsTable />
        <AddCabin />
    </>
  );
}

export default Cabins;
