<template>
    <form @submit.prevent="HandleSubmit" autocomplete="false">
        <h3>Sign Up</h3>
        <div class="form-group">
            <label class="form-label" for="displayName">Display Name</label>
            <span class="material-icons icon">error_outline</span>
            <input 
                class="form-input"
                type="text"
                id="displayName"
                v-model="displayName"
                @blur="HandleBlur"
                @focus="HandleFocus"    
            />
        </div>

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
                Sign Up
            </button>
        </div>
        <div v-else>
            <button class="Load" disabled><img :src="loading"/></button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import useSignUp from '@/Composables/useSignUp';
import FormEvent from '../../Composables/FormEvent';
import { useRouter } from 'vue-router';

export default {
    setup()
    {   
        const router = useRouter();
        const loading = require('../../assets/loading.svg');

        const { HandleFocus, HandleBlur, ValidateInputField } = FormEvent();
        const {error , signup, isPending} = useSignUp();

        const email = ref('');
        const password = ref('');
        const displayName = ref('');

        const HandleSubmit = async () => {
            if(displayName.value === '' || email.value === '' || password.value === '')
            {
                if(displayName.value === '')
                {
                    ValidateInputField('#displayName');
                }

                if(email.value === '')
                {
                    ValidateInputField('#email');
                }

                if(password.value === '')
                {
                    ValidateInputField('#password');
                }
                return;
            }
            await signup(email.value, password.value, displayName.value);
            if(!error.value)
            {
                console.log('User Signed In Successfully');
                router.push({name : 'Home'})
            }
        }

        return { email, password, displayName, HandleSubmit, error, isPending, loading, HandleFocus, HandleBlur}
    }
}
</script>

<style>
</style>