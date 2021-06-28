<template>
    <!-- <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul> -->
    <form @submit.prevent="HandleSubmit" autocomplete="off">
        <h4>Create New Playlist</h4>
        <!-- Title -->
        <div class="form-group">
            <label class="form-label" for="title">Playlist Title</label>
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
        <!-- Description -->
        <div class="form-group">
            <label class="form-label" for="description">Playlist description...</label>
            <span class="material-icons icon">error_outline</span>
            <textarea
                class="form-input description"
                id="description"
                maxlength="200"
                v-model="description"
                @blur="HandleBlur"
                @focus="HandleFocus"
            >
            </textarea>
        </div>
        <label class="descLabel">{{ descLength }}/200</label>

        <div class="form-group">
            <span class="material-icons icon uploadErrorIcon">error_outline</span>
            <label class="uploadLabel">Upload playlist cover image</label>
        </div>
        <input type="file" @change="HandleFileChange" />
        <div class="error">{{ fileError }}</div>

        <div v-if="!isPending">
            <button class="LoginSignUpBtn">Create</button>
        </div>
        <div v-else>
            <button class="Load" disabled><img :src="loading" /></button>
        </div>
    </form>
</template>

<script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import useStorage from "@/Composables/useStorage";
import useCollection from "../../Composables/useCollection";
import GetUser from "../../Composables/GetUser";
import { timeStamp } from "../../firebase/Config";
import FormEvent from "../../Composables/FormEvent";

export default {
  setup() {
    const router = useRouter();
    const title = ref("");
    const description = ref("");
    const descLength = ref(0);
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);
    const loading = require("../../assets/loading.svg");

    watch(description, (val) => {
      descLength.value = val.length;
    });

    const { user } = GetUser();
    const { url, filePath, uploadImage } = useStorage();
    const { error, AddDocument } = useCollection("playlists");
    const { HandleFocus, HandleBlur, ValidateInputField } = FormEvent();

    const HandleSubmit = async () => {
        if (title.value === "" || description.value === "") 
        {
            if (title.value === "") 
            {
                ValidateInputField("#title");
            }

            if (description.value === "") 
            {
                ValidateInputField("#description");
            }
        } 
        else if (!file.value) 
        {
            ValidateInputField(".uploadLabel");
        } 
        else 
        {
            isPending.value = true;
            await uploadImage(file.value);
            const res = await AddDocument({
                title: title.value,
                description: description.value,
                userId: user.value.uid,
                userName: user.value.displayName,
                coverUrl: url.value,
                filePath: filePath.value,
                songs: [],
                createdAt: timeStamp,
            });
            if (!error.value) {
                router.push({ name: "PlaylistDetails", params: { id: res.id } });
            }
            isPending.value = false;
        }
    };

    // allowed File Types
    const types = ["image/png", "image/jpeg", "image/jpg"];
    const HandleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        document.querySelector(".uploadErrorIcon").classList.remove("displayIcon");
        document.querySelector(".uploadLabel").classList.remove("errorInput");

        if (selectedFile && types.includes(selectedFile.type)) 
        {
            file.value = selectedFile;
            fileError.value = null;
        } 
        else 
        {
            fileError.value = "Please select an image file (png/jpg/jpeg)";
            file.value = null;
        }
    };

    return {
      title,
      description,
      descLength,
      file,
      fileError,
      isPending,
      loading,
      HandleSubmit,
      HandleFileChange,
      HandleFocus,
      HandleBlur,
    };
  },
};
</script>

<style>
.icon {
  display: none;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 2;
  color: #ff000091;
  font-size: 20px;
}
.displayIcon {
  display: block;
}
.errorInput {
  box-shadow: 0 2px 0 0 #ff000091 !important;
}

input[type="file"] {
  border: 0;
  padding: 0;
  cursor: pointer;
  display: inline;
  width: 50%;
}

input[type="file"]::file-selector-button {
  background: var(--secondary);
  border-radius: 8px;
  border: 0;
  padding: 8px 12px;
  display: inline-block;
  cursor: pointer;
}
input[type="file"]::file-selector-button:hover {
  background: var(--primary);
  color: white;
}

.descLabel {
  margin-bottom: 15px;
  display: block;
  font-size: 12px;
  text-align: right;
}
.uploadLabel {
  font-size: 14px;
}

.description {
  resize: vertical;
  height: 50px;
  min-height: 50px;
  max-height: 140px;
  margin-bottom: 10px;
}

#app {
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  width: 100%;
  height: 100vh;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 20s linear infinite;
  bottom: 0px;
  opacity: 0;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 1;
    border-radius: 50%;
  }
}
</style>