<template>
  <main class="w-full flex flex-col px-20 py-10 items-center">
    <div class="card w-2/3 bg-base-100 shadow-xl">
      <form @submit.prevent="submitData" class="card-body prose max-w-none">
        <h1 class="p-0 m-0">Blog Form</h1>

        <label class="mt-8 text-base">Thumbnail URL</label>
        <input 
          v-model="form.thumbnail" 
          type="text" 
          class="input input-bordered w-full"
          required/>

        <label class="mt-8 text-base">Title</label>
        <input 
          v-model="form.title" 
          type="text" 
          class="input input-bordered w-full"
          maxlength="255" 
          required/>

        <label class="mt-8 text-base">Description</label>
        <ClientOnly>
          <EditorJs 
            classAttributes="mt-5 border px-2 w-full text-start" 
            v-model="form.description" ></EditorJs>
        </ClientOnly>

        <button class="btn btn-success mt-10" type="submit">Kirim Data</button>
      </form>
    </div>
  </main>
</template>

<script setup>
  // Import library
  import { useLoading } from 'vue-loading-overlay'

  // Define layout and middleware
  definePageMeta({
    layout: "panel-layout",
    middleware: [
      'verify-token'
    ]
  });

  // Heading and set body attributes
  useHead({
    title: `Blog Form | WEB NAME`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
      { name: 'description', content: `Blog Form | WEB NAME` }
    ],
  })

  // Variables
  const form = {
    title: "",
    description: {},
    thumbnail: "",
  }

  const $loading = useLoading();

  // Functions
  function submitData(){
    // Show loading
    const loader = $loading.show();

    // Hit API
    handleFetch('/endpoint', {
      method: 'post',
      body: {
        thumbnail: form.thumbnail,
        title: form.title,
        description: JSON.stringify(form.description),
        mentor_id: ""
      }
    })
      .then(response => {
        // Show notification
        if (response){
          alert("Data has been added successfully");
        }

        // Redirect page
        navigateTo("/panel/blogs")
      })
      .catch(err => {
        console.log('add blog error', err.statusCode, '-', err);
        if (err.data?.message){
          alert(err.data.message)
        }
      })
      .finally(() => {
        // Hide loading
        loader.hide();
      })
  }
</script>