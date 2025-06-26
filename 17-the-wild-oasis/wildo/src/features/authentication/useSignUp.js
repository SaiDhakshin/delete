import { signUp as signUpApi } from '../../services/apiAuth'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

export function useSignUp() {

    const { isLoading, mutate: signUp } = useMutation({
        mutationFn: signUpApi,
        onSuccess: (data) => {
            console.log(data);
            toast.success('Successfully created user, please verify email address')
        }
    })

    return { isLoading, signUp }
}