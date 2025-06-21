import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useUpdateSettings } from './useUpdateSettings';

function UpdateSettingsForm() {

  const { isLoading, settings: { minimumBookingLength, maxBookingLength, 
    maxNumberOfGuestPerBooking, breakfastPrice
   } = {},} = useSettings();

  const { isUpdating, updateSetting } = useUpdateSettings();

  if(isLoading) return <Spinner />

  function handleUpdate(e, field) {
    const { value } = e.target;
    if(!value) return;

    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minimumBookingLength} 
          onBlur={e => handleUpdate(e, 'minimumBookingLength')}
          disabled={isUpdating}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength}
          onBlur={e => handleUpdate(e, 'maxBookingLength')}
          disabled={isUpdating}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxNumberOfGuestPerBooking}
          onBlur={e => handleUpdate(e, 'maxNumberOfGuestPerBooking')}
          disabled={isUpdating}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice}
          onBlur={e => handleUpdate(e, 'breakfastPrice')}
          disabled={isUpdating}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
