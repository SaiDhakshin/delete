import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking, deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from 'react-hot-toast';

export function useCheckout() {

    const queryClient = useQueryClient();

    const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            isPaid: true,
            status: 'checked-out'
        }),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked out`);
            queryClient.invalidateQueries({ active: true });
        },
        onError: () => {
            toast.error("There was an error in checking out")
        }
    })

    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: (bookingId) => deleteBookingApi(bookingId),
        onSuccess: (data) => {
            toast.success(`Booking #${data?.id} successfully deleted`);
            queryClient.invalidateQueries({ active: true });
        },
        onError: () => {
            toast.error("There was an error in deleting booking")
        }
    })

    return { isCheckingOut, checkout, deleteBooking, isDeleting }
}