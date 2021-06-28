import { ref, watchEffect } from "vue";
import { fireStore } from "../firebase/Config";

const GetDocument = (collection, id) => {
    const error = ref(null);
    const document = ref(null);

    const documentRef = fireStore.collection(collection).doc(id);

    const unsubscribe = documentRef.onSnapshot(doc => {
        
        if(doc.data())
        {
            document.value = { ...doc.data(), id : doc.id };
            error.value = null;
        }
        else
        {
            error.value = 'Document does not exist!!!';
        }
    }, (err) => {
        console.log(err.message);
        error.value = 'Could not fetch document. Please try again...';
    })

    watchEffect((onInvalidate) => {
        // unsubscribe from prev collection when watcher is stopped (component unmounted)
        onInvalidate(() => unsubscribe())
    })

    return { error, document }
}

export default GetDocument;