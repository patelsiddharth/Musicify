import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Auth/Login.vue';
import SignUp from '../views/Auth/SignUp.vue';
import CreatePlaylist from '../views/Playlists/CreatePlaylist.vue';
import PlaylistDetails from '../views/Playlists/PlaylistDetails.vue';
import UserPlaylists from '../views/Playlists/UserPlaylists.vue';
import { Auth } from '../firebase/Config';

const requireAuth = (to, from, next) => {
    const user = Auth.currentUser;
    if(user)
    {
        next();
    }
    else
    {
        next({name : "Login"})
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter : requireAuth
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/playlists/create',
        name : 'CreatePlaylist',
        component : CreatePlaylist,
        beforeEnter : requireAuth
    },
    {
        path: '/playlists/:id',
        name : 'PlaylistDetails',
        component : PlaylistDetails,
        beforeEnter : requireAuth,
        props : true
    },
    {
        path: '/playlists/user',
        name : 'UserPlaylists',
        component: UserPlaylists,
        beforeEnter : requireAuth
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
