<template>
    <div>
        <h2>My Playlists</h2>
        <div v-if="playlists">
            <ListView :playlists="playlists"/>
        </div>
        <router-link :to="{name : 'CreatePlaylist'}" class="btn">Create a new playlist</router-link>
    </div>
</template>

<script>
import GetUser from '../../Composables/GetUser';
import GetCollection from '../../Composables/GetCollection';
import ListView from '../../components/ListView';
export default {
    components : {ListView},
    setup()
    {
        const { user } = GetUser();
        const { documents : playlists } = GetCollection('playlists', [ 'userId' , '==', user.value.uid]);
        return { playlists }
    }
}
</script>

<style>

</style>