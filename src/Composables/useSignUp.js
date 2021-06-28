import { ref } from "vue";
import { Auth } from "../firebase/Config";

const error = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {
    error.value = null;
    isPending.value = true;
    try
    {
        const res = await Auth.createUserWithEmailAndPassword(email, password);
        if(!res)
        {
            throw new Error('Could not complete sign up process');
        }
        await res.user.updateProfile({displayName});
        error.value = null;
        isPending.value = false;
        return res;
    }
    catch(e)
    {
        console.log(e.message);
        error.value = e.message;
        isPending.value = false;
    }
}

const useSignUp = () => {
    return { error, signup, isPending }
}

export default useSignUp;