<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

// Global constant containing the API base URL -> /api
const baseURL = __API_PATH__;

//Create an axios instance with the base URL
const api = axios.create({
  baseURL,
});

const src = ref("");
const isUploading = ref(false);

// function to upload a file
async function uploadFile(event: Event) {
  const files = (event.target as HTMLInputElement)?.files;

  try {
    isUploading.value = true;

    if (!files || files.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    // get the first file from the filelist
    const file = files[0];

    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);

    // send the form data to the server
    const response = await api.post<{ image: string }>("/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // get the image URL from the response and update the src ref
    const image = response.data.image;
    src.value = image;
  } catch (error: any) {
    console.error(error.message);
  } finally {
    isUploading.value = false;
  }
}
</script>

<template>
  <form>
    <label class="btn" for="upload">
      {{ isUploading ? "Uploading..." : "Upload an image" }}
    </label>
    <input type="file" id="upload" accept="image/*" @change="uploadFile" />
  </form>

  <figure>
    <img v-if="src" :src="src" class="w-1/2 h-1/2" alt="file" />
  </figure>
</template>

<style scoped>
form {
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

input[type="file"] {
  display: none;
}

label.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  color: white;
  background-color: #4a5568;
  cursor: pointer;
}

figure {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  width: 200px;
}

img {
  width: 100%;
  border-radius: 0.5rem;
}
</style>
