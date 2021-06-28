import { ref } from "vue"
import { Auth } from "../firebase/Config";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
    error.value = null;
    isPending.value = true;

    try
    {
        const res = await Auth.signInWithEmailAndPassword(email, password);
        if(!res)
        {
            throw new Error('Incorrect login credentials');
        }
        error.value = null;
        isPending.value = false;
        return res;
    }
    catch(e)
    {
        isPending.value = false;
        console.log(e);
        error.value = e.message;
    }
}

const useLogin = () => {
    return {error, login, isPending}
}

export default useLogin;