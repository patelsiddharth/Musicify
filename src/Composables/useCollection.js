import { ref } from "vue"
import { fireStore } from "../firebase/Config"

const useCollection = (collection) => {
    const error = ref(null);
    const isPending = ref(false);

    const AddDocument = async (doc) => {
        error.value = null;
        isPending.value = true;
        try
        {
            const res = await fireStore.collection(collection).add(doc);
            isPending.value = false;
            return res;
        }
        catch(e)
        {
            console.log(e.message);
            error.value = 'Could not send message';
            isPending.value = false;
        }
    }

    return { error, AddDocument, isPending }
}

export default useCollection;