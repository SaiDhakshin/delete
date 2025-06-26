import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from '../../ui/Spinner'
import { useRecentStays } from "./useRecentStays";
import Stats from './Stats';
import { useCabins } from '../cabins/useCabins'
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {

  const { isLoading: isRecentBookingLoading, bookings } = useRecentBookings();
  const { isLoading: isStayLoading, stays, confirmedStays, numDays } = useRecentStays();
  const {cabins, isLoading: isLoadingCabins} = useCabins();

  if(isRecentBookingLoading || isStayLoading || isLoadingCabins) return <Spinner />

  console.log(bookings)
  return (
    <StyledDashboardLayout>
     <Stats bookings={bookings} stays={confirmedStays} cabins={cabins} numDays={numDays}/>
     <SalesChart bookings={bookings} numDays={numDays}/>
      <div>Todays activities</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout

