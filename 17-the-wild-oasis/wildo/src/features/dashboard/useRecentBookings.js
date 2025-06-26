import { useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {

    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"))
    const queryDays = new Date(Date.now() - numDays * 24 * 60 * 60 * 1000)?.toISOString();

    const { isLoading, data: bookings } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDays),
        queryKey: ['bookings', `last-${numDays}`]
    })

    return { isLoading, bookings }
}