import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import CheckBox from '../../ui/Checkbox'
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const {isLoading, booking} = useBooking();
  const moveBack = useMoveBack();
  const { isCheckingIn, checkIn } = useCheckin();
  const { isLoading: isSettingsLoading, settings} = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false)
  },[booking])

  if(isLoading || isSettingsLoading) return <Spinner />

  const {
    id: bookingId,
    guests,
    totalPrice,
    numberOfGuests,
    hasBreakfast,
    numberOfNights,
  } = booking;

  const optionalBreakfastPrice = settings.breakfastPrice * numberOfNights;

  function handleCheckin() {
    if(!confirmPaid) return;
    if(addBreakfast){
      checkIn({bookingId, breakfast: {
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: optionalBreakfastPrice + totalPrice
      }})
    } else {
      checkIn(bookingId)
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      { !hasBreakfast && (<Box>
        <CheckBox checked={addBreakfast} onChange={() => {setAddBreakfast(confirm => !confirm);
          setConfirmPaid(false)
        }} id="breakfast">
          Want to add breakfast for {optionalBreakfastPrice}?
        </CheckBox>
      </Box>)}

      <Box>
        <CheckBox checked={confirmPaid} onChange={() => setConfirmPaid(confirm => !confirm)}
          disabled={confirmPaid || isCheckingIn}>
          I confirm that {guests.fullName} has paid the total amount of {!addBreakfast ? totalPrice.toString() : (totalPrice + optionalBreakfastPrice).toString()}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
