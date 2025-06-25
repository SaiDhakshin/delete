import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export function useCheckin() {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isLoading: isCheckingIn, mutate: checkIn } = useMutation({
        mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, {
            isPaid: true,
            status: 'checked-in',
            ...breakfast
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`);
            queryClient.invalidateQueries({ active: true });
            navigate('/')
        },
        onError: () => {
            toast.error("There was an error in checking in")
        }
    })

    return { isCheckingIn, checkIn }
}