<template>
    <div class="home">
        <p>Homepage</p>
        <div v-if="error" class="error">Could not fetch the data</div>
        <div v-if="documents">
            <ListView :playlists="documents"/>
        </div>
    </div>    
</template>

<script>
import GetCollection from '../Composables/GetCollection';
import ListView from '../components/ListView';
export default {
    name: 'Home',
    components : { ListView },
    setup()
    {
        const { error, documents } = GetCollection('playlists');

        return { error, documents }
    }
}
</script>
