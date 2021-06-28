<template>
    <form @submit.prevent="HandleSubmit">
        <h3>Login</h3>

        <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <span class="material-icons icon">error_outline</span>
            <input 
                class="form-input"
                type="email"
                id="email"
                v-model="email"
                @blur="HandleBlur"
                @focus="HandleFocus"    
            />
        </div>

        <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <span class="material-icons icon">error_outline</span>
            <input 
                class="form-input"
                type="password"
                id="password"
                v-model="password"
                @blur="HandleBlur"
                @focus="HandleFocus"    
            />
        </div>

        <div class="error" v-if="error">{{error}}</div>
        <div v-if="!isPending">
            <button class="LoginSignUpBtn">
                Login
            </button>
        </div>
        <div v-else>
            <button class="Load" disabled><img :src="loading"/></button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import useLogin from '@/Composables/useLogin';
import FormEvent from '../../Composables/FormEvent';
import { useRouter } from 'vue-router';

export default {
    setup()
    {
        const router = useRouter();
        const { HandleFocus, HandleBlur, ValidateInputField } = FormEvent();
        const loading = require('../../assets/loading.svg');
        const {error , login, isPending} = useLogin();
        const email = ref('');
        const password = ref('');

        const HandleSubmit = async () => {
            if(email.value === '' || password.value === '')
            {
                if(email.value === '')
                {
                    ValidateInputField('#email');
                }

                if(password.value === '')
                {
                    ValidateInputField('#password');
                }
            }
            else
            {
                await login(email.value, password.value);
                if(!error.value)
                {
                    console.log('User logged In Successfully');
                    router.push({name : 'Home'})
                }
            }
        }

        return { email, password, HandleSubmit, error, isPending, loading, HandleFocus, HandleBlur}
    }
}
</script>

<style>
.LoginSignUpBtn, .Load img
{
    width: 80px;
    height: 40px;
}
.Load
{
    width: 80px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus 
{
    -webkit-box-shadow:0 -2px 0 0 lightgreen inset!important;
    -webkit-background-clip: text !important;
}
</style>