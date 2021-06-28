<template>
    <div class="add-song">
        <transition name="fade" mode="out-in">
            <button v-if="!showForm" @click="showForm = true">Add Songs</button>
            <form v-else @submit.prevent="HandleSubmit">
                <div class="song-header">
                    <h4>Add a new song</h4>
                    <span @click="showForm = false" class="close-btn">
                        <span class="material-icons">close</span>
                    </span>
                </div>
                <div class="form-group">
                    <label class="form-label" for="title">Song title</label>
                    <span class="material-icons icon">error_outline</span>
                    <input 
                        class="form-input"
                        type="text"
                        id="title"
                        v-model="title"
                        @blur="HandleBlur"
                        @focus="HandleFocus"    
                    />
                </div>
                <div class="form-group">
                    <label class="form-label" for="artist">Artist</label>
                    <span class="material-icons icon">error_outline</span>
                    <input 
                        class="form-input"
                        type="text"
                        id="artist"
                        v-model="artist"
                        @blur="HandleBlur"
                        @focus="HandleFocus"    
                    />
                </div>
                <button>Add</button>
            </form>
        </transition>
    </div>
</template>

<script>
import { ref } from 'vue';
import FormEvent from '../Composables/FormEvent';
import useDocument from '../Composables/useDocument';

export default {
    props : ['playlist'],
    setup(props)
    {
        const title = ref('');
        const artist = ref('');
        const showForm = ref(false);
        console.log(props.playlist);
        const { HandleFocus, HandleBlur, ValidateInputField } = FormEvent();
        console.log(props.playlist.id);
        const { updateDoc } = useDocument('playlists', props.playlist.id);

        const HandleSubmit = async () => {
            if(title.value === '' || artist.value === '')
            {
                if(title.value === '')
                {
                    ValidateInputField('#title');
                }

                if(artist.value === '')
                {
                    ValidateInputField('#artist');
                }
                return;
            }

            const newSong = {
                title : title.value,
                artist : artist.value,
                id : Math.floor(Math.random() * 10000000)
            }
            await updateDoc({
                songs : [ ...props.playlist.songs , newSong]
            });

            showForm.value = !showForm.value;
            title.value = '';
            artist.value = '';
        }

        return { title, artist, showForm, HandleSubmit, HandleFocus, HandleBlur }
    }
}
</script>

<style scoped>
.add-song
{
    text-align: center;
    margin-top: 40px;
}
form
{
    max-width: 100%;
    text-align: left;
}
.close-btn
{
    border-radius: 50%;
    display: flex;
    padding: 5px;
}
.close-btn:hover
{
    background: #eee;
}
.song-header
{
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.fade-enter-from
{
    opacity: 0;
}
.fade-enter-active
{
    transition: all .35s;
}
.fade-leave-to
{
    opacity: 0;
    transition: all .35s;
}
</style>