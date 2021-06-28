import { ref } from "vue"
import { Auth } from '../firebase/Config'

const user = ref(Auth.currentUser);

Auth.onAuthStateChanged(_user => {
    user.value = _user;
})

const GetUser = () => {
    return{ user }
}

export default GetUser;