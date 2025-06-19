/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-hot-toast';

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from 'react-hook-form'
import { createEditCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {

  const {  id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  const queryClient = useQueryClient();
  const { errors } = formState;


  const { mutate: createCabin, isWorking: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabin']
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const { mutate: editCabin, isWorking: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success('cabin successfully edited');
      queryClient.invalidateQueries({
        queryKey: ['cabin']
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data?.image?.[0]
    // console.log(data)
    if(isEditSession) editCabin({ newCabin: {...data, image}, id: editId});
    else createCabin({...data, image: image})
  }

  function onErrors(err) {
    console.log(err)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register('name',{
          required: 'This field is required'
        })} 
        disabled={isWorking}/>
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register('maxCapacity',{
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Capacity should be atleast 1'
          }
        })}
        disabled={isWorking}/>
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" defaultValue={0} {...register('regularPrice',{
          required: 'This field is required',
          min: {
            value: 1,
            message: 'regularPrice should be atleast 1'
          }
        })}
        disabled={isWorking}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register('discount',{
          required: 'This field is required',
          validate: (value) => value < getValues().regularPrice || 'Discount price to be less than price'
        })}
        disabled={isWorking}/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register('description',{
          required: 'This field is required'
        })}
        disabled={isWorking}/>
      </FormRow>

      <FormRow label="Cabin photo" >
        <FileInput id="image" accept="image/*" type="file" {...register('image',{
          required: isEditSession ? false : 'This field is required'
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{ isEditSession ? 'Edit cabin' : 'Add cabin' }</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
