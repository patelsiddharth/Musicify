import {ref} from 'vue';
import { fbStorage } from '../firebase/Config';
import GetUser from './GetUser';

const { user } = GetUser();

const useStorage = () => {
    const error = ref(null);
    const url = ref(null);
    const filePath = ref(null);

    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`;
        console.log(filePath.value);
        const storageRef = await fbStorage.ref(filePath.value);
        console.log(storageRef);
        try
        {
            console.log('test1');
            const res = await storageRef.put(file);
            console.log('test2');
            url.value = await res.ref.getDownloadURL();
            console.log('test3');
        }
        catch(e)
        {
            console.log('test');
            console.log(e.message);
            error.value = e.message;
        }
    }

    const deleteImage = async (path) => {
        const storageRef = fbStorage.ref(path);
        try
        {
            await storageRef.delete();
        }
        catch(e)
        {
            console.log(e.message);
            error.value = e.message;
        }
    }
    
    return { url, filePath, error, uploadImage, deleteImage }
}

export default useStorage;