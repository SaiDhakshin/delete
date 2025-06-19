import supabase, {supabaseUrl} from "./supabase";

export async function getCabins() {

    const { data, error } = await supabase.from('cabins').select('*')
    if (error) {
        console.log('Cabins could not be loaded');
        throw new Error(error)
    }
    return data;
}

export async function deleteCabin(id) {

    const { data, error } = await supabase.from('cabins').delete().eq('id', id)
    if (error) {
        console.log('Cabin could not be deleted')
        throw new Error(error);
    }
    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl)

    const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll("/","")

    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    // 1. Create Cabin
    let query = supabase.from('cabins');

    if(!id) query = query.insert([{...newCabin, image: imagePath}])
   
    if(id) query = query.update({ ...newCabin, image: imagePath })
        .eq('id', id)    
    
    const { data, error } = await query.select().single();
        
    if (error) {
        console.log(error)
        throw new Error(error)
    }

    // 2. Upload Image
    const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

    // 3.Delete cabin if there was an error in uploading file
    if(storageError) {
        await supabase.from("cabins").delete().eq("id", data.id)
        console.log(storageError);
        throw new Error("Cabin image could not be uploaded")
    }

    return data;
}