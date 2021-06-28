import { ref } from "vue"
import { fireStore } from "../firebase/Config"

const useDocument = (collection, id) => {
    const error = ref(null);
    const isPending = ref(null);

    const documentRef = fireStore.collection(collection).doc(id);

    const deleteDoc = async () => {
        isPending.value = true;
        error.value = null;
        try
        {
            const res = await documentRef.delete();
            isPending.value = false;
            return res;
        }
        catch(err)
        {
            isPending.value = false;
            console.log(err.message);
            error.value = "Error deleting document. Please try again...";
        }
    }
    
    const updateDoc = async (updatedDoc) => {
        isPending.value = true;
        error.value = null;
        try
        {
            const res = await documentRef.update(updatedDoc);
            isPending.value = false;
            return res;
        }
        catch(err)
        {
            isPending.value = false;
            console.log(err.message);
            error.value = "Error updating document. Please try again...";
        }
    }

    return { error, isPending, deleteDoc, updateDoc }
}

export default useDocument;