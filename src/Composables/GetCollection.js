import { ref, watchEffect } from "vue"
import { fireStore } from "../firebase/Config"

const GetCollection = (collection, query) => {
    const error = ref(null);
    const documents = ref(null);

    let collectionRef = fireStore.collection(collection).orderBy('createdAt')

    if(query)
    {
        collectionRef = collectionRef.where(...query);
    }

    const unsubscribe = collectionRef.onSnapshot(snap => {
        let results = [];
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({ ...doc.data(), id : doc.id })
        })
        documents.value = results;
        error.value = null;
    }, (err) => {
        console.log(err);
        error.value = err.message;
        documents.value = null;
    })

    watchEffect((onInvalidate) => {
        // unsubscribe from prev collection when watcher is stopped (component unmounted)
        onInvalidate(() => unsubscribe())
    })
    return { error, documents }
}

export default GetCollection;