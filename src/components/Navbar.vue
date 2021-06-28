<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/icon1.gif" alt="Home Icon">
            <div class="Navtitle">
                <router-link :to="{name: 'Home'}">Musicify</router-link>
            </div>
            <div class="links">
                <div class="navBtn" v-if="user">
                    <router-link :to="{ name : 'CreatePlaylist' }">Create Playlist</router-link>
                    <router-link :to="{ name : 'UserPlaylists' }">User Playlist</router-link>
                    <span class="displayNameSpan">Hi there {{user.displayName}}</span>
                    <button @click="handleLogout" class="logoutBtn">
                        Logout
                        <span class="material-icons logoutIcon">logout</span>
                    </button>
                </div>
                <div v-else>
                    <router-link class="btn" :to="{name : 'SignUp'}">Sign Up</router-link>
                    <router-link class="btn" :to="{name : 'Login'}">Login</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import useLogout from '../Composables/useLogout';
import GetUser from '../Composables/GetUser';
import { useRouter } from 'vue-router';

export default {
    setup()
    {
        const router = useRouter();
        const { logout } = useLogout();

        const { user } = GetUser();

        const handleLogout = async () => {
            await logout();
            console.log('user logged out');
            router.push({name : 'Login'})
        }

        return { handleLogout, user }
    }
}
</script>

<style scoped>
.navbar
{
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}
nav
{
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}
nav h1
{
    margin-left: 20px;
}
nav .links
{
    margin-left: auto;
}
nav .links a, button
{
    margin-left: 16px;
    font-size: 14px;
}
nav img
{
    max-height: 60px;
}
.navBtn
{
    display: flex;
    align-items: center;
}
.logoutBtn
{
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.4s;
}
.logoutIcon
{
    font-size: 16px;
    transition: all 0.4s;
}
.logoutBtn:hover
{
    color: white;
    background: var(--warning);
}
.logoutBtn:hover .logoutIcon
{
    color: white;
}

.displayNameSpan
{
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
}

.Navtitle
{
    font-size: 30px;
    font-weight: bold;
}
.Navtitle
{
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 200% 200%;
	animation: gradient 10s ease infinite;
    background-position: center;
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 40px;
    text-transform: uppercase;
    font-weight: 900;
    -webkit-font-smoothing: antialiased;
}
@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>