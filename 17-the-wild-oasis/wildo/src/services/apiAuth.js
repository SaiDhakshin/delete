import supabase, { supabaseUrl } from "./supabase"

export async function login({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (error) {
        throw new Error(error.message)
    }

    return { data, error }
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session) return null;

    const { error, data } = await supabase.auth.getUser();

    if (error) {
        throw new Error(error.message)
    }

    return data?.user
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message)
    }
}

export async function signUp({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email, password, options: {
            data: {
                fullName,
                avatar: ''
            }
        }
    })

    if (error) {
        throw new Error(error.message)
    }

    return data
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    let updatedData;
    if (password) updatedData = { password };
    if (fullName) updatedData = { data: { fullName } };


    const { data, error } = await supabase.auth.updateUser(updatedData)

    if (error) {
        throw new Error(error.message)
    }

    if (!avatar) return data;

    const fileName = `avatar-${data.user.id}-${Math.random()}`

    const { error: storageError } = await supabase.storage.from("avatars")
        .upload(fileName, avatar)

    if (storageError) {
        console.log(storageError.message)
        throw new Error(storageError);
    }

    const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
        }
    })

    if (error2) {
        throw new Error(error.message)
    }

    return updatedUser
}