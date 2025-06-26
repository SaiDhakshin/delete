import { useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {

    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"))
    const queryDays = new Date(Date.now() - numDays * 24 * 60 * 60 * 1000)?.toISOString();

    const { isLoading, data: stays } = useQuery({
        queryFn: () => getStaysAfterDate(queryDays),
        queryKey: ['stays', `last-${numDays}`]
    })

    const confirmedStays = stays?.filter(stay => stay.status === "checked-in" || stay.status === 'checked-out')

    return { isLoading, stays, confirmedStays, numDays }
}