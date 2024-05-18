<template>
  <main class="w-full flex flex-col px-20 py-10 items-center">
    <div class="card w-2/3 bg-base-100 shadow-xl">
      <div class="card-body">
        <article class="prose max-w-none">
          <div class="flex flex-row items-center">
            <h1 class="p-0 m-0">Blogs</h1>

            <a href="/panel/blogs/form" class="ml-auto btn btn-success">Add Data</a>
          </div>
          
          <!-- Table Data -->
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Actions</th>
                  <th>Title</th>
                  <th>Created</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in blogsData"
                  :key="item">
                  <th>{{ getRowNumber(index) }}</th>
                  <td class="flex flex-row gap-2">
                    <div class="tooltip" data-tip="Edit Data">
                      <a :href="`/panel/blogs/form/${item.id}`" class="btn btn-sm btn-info">
                        <ClientOnly><font-awesome-icon :icon="['fas', 'pen-to-square']" class="h-4 w-4"></font-awesome-icon></ClientOnly>
                      </a>
                    </div>

                    <div class="tooltip" data-tip="Delete Data">
                      <button class="btn btn-sm btn-error" @click="handleDelete(item)">
                        <ClientOnly><font-awesome-icon :icon="['fas', 'trash-can']" class="h-4 w-4"></font-awesome-icon></ClientOnly>
                      </button>
                    </div>
                  </td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.created_at }}</td>
                  <td>{{ item.updated_at }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- ./Table Data -->
        </article>

        <div class="join mx-auto">
          <button class="join-item btn" :class="isPrevAvailable ? '' : 'btn-disabled'" @click="prevPage()">«</button>
          <button class="join-item btn">Page {{ page }}</button>
          <button class="join-item btn" :class="isNextAvailable ? '' : 'btn-disabled'" @click="nextPage()">»</button>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
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
    title: `Blogs | WEB NAME`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
      { name: 'description', content: `Blogs | WEB NAME` }
    ],
  })

  // Variables
  const blogsData = ref([]);
  const $loading = useLoading();
  const page = ref(1);
  const pageSize = ref(10);
  const totalPages = ref(0);
  const totalRows = ref(0);
  const isPrevAvailable = ref(false);
  const isNextAvailable = ref(false);

  // Lifecycle callback
  onMounted(() => {
    getBlogsData();
  })

  // Functions
  function getBlogsData(){
    // Clear table data
    blogsData.value = [];

    // Set URL Query Params
    let params = new URLSearchParams([
      ["page", page.value],
      ["page_size", pageSize.value],
    ]);

    // Show loading
    const loader = $loading.show();

    // Hit API
    handleFetch(`/endpoint?${params}`)
      .then((response: any) => {
        if (response?.data){
          if (response.data?.data){
            blogsData.value = response.data.data;
          }

          if (response.data?.total){
            totalRows.value = response.data.total;
          } else {
            totalRows.value = 0;
          }

          if (response.data?.last_page){
            totalPages.value = response.data.last_page;
          } else {
            totalPages.value = 0;
          }

          checkPagination();
        }
      })
      .catch(err => {
        console.log('blogs error', err.statusCode, '-', err);
        if (err.data?.message){
          alert(err.data.message)
        }
      })
      .finally(() => {
        loader.hide();
      })
  }

  function checkPagination(){
    isPrevAvailable.value = page.value - 1 > 0;
    isNextAvailable.value = page.value + 1 <= totalPages.value;
  }

  function getRowNumber(index: number){
    // Calculate row number
    return ((page.value - 1) * pageSize.value) + index + 1;
  }

  function nextPage(){
    page.value += 1;

    getBlogsData();
  }

  function prevPage(){
    page.value -= 1;

    getBlogsData();
  }

  function refreshData(){
    page.value = 1;

    getBlogsData();
  }

  function handleDelete(item: any){
    if (confirm(`Are you sure you want to delete this item '${item.title}'`)){
      // Show loading
      const loader = $loading.show();

      // Hit API
      handleFetch(`/endpoint/${item.id}`, {
        method: 'delete'
      })
      .then((response: any) => {
        refreshData();
      })
      .catch(err => {
        console.log('delete blog error', err.statusCode, '-', err);
        if (err.data?.message){
          alert(err.data.message)
        }
      })
      .finally(() => {
        loader.hide();
      })
    }
  }
</script>