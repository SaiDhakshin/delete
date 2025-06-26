/* eslint-disable react/prop-types */
import Stat from "./Stat"
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2'

function Stats({bookings, stays, numDays, cabins}) {
    const numBookings = bookings?.length;
    const sales = `$` + bookings.reduce((acc,cur) => acc + cur.totalPrice, 0)
    const checkins = stays.length;
    const occupancyRate = stays.reduce((acc,cur) => acc + cur.numberOfNights, 0) / (numDays * cabins?.length)
    return (
        <>
            <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings}/>
            <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={sales}/>
            <Stat title="Check ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkins}/>
            <Stat title="Occupancy rate" color="yellow" icon={<HiOutlineChartBar />} value={(Math.round(occupancyRate) * 100) + '%'}/>
        </>
    )
}

export default Stats
