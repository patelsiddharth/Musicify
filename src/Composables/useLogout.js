import { ref } from "vue"
import { Auth } from "../firebase/Config"

const error = ref(null);
const isPending = ref(false);

const logout = async () => {
    error.value = null;
    isPending.value = true;
    try
    {
        await Auth.signOut();
        isPending.value = false;
    }
    catch(e)
    {
        console.log(e.message);
        error.value = e.message;
        isPending.value = false;
    }
}

const useLogout = () => {
    return { error, logout, isPending }
}

export default useLogout;