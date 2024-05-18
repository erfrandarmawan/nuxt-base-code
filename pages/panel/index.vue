<template>
  <main class="w-full flex flex-col px-20 py-10 items-center">
    <div class="card w-2/3 bg-base-100 shadow-xl">
      <div class="card-body">
        <article class="prose max-w-none">
          <h1>Dashboard</h1>
          
          <!-- Stats -->
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in statsData"
                  :key="item">
                  <th>{{ index + 1 }}</th>
                  <td>{{ item.label }}</td>
                  <td>{{ item.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- ./Stats -->
        </article>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  // Define layout and middleware
  definePageMeta({
    layout: "panel-layout",
    middleware: [
      'verify-token'
    ]
  });

  // Heading and set body attributes
  useHead({
    title: `Dashboard | WEB NAME`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
      { name: 'description', content: `Dashboard | WEB NAME` }
    ],
  })

  // Variables
  const statsData = ref([]);

  // Lifecycle callback
  onMounted(() => {
    getStatsData();
  })

  // Functions
  function getStatsData(){
    statsData.value = [
      {
        "label": "Total Users",
        "value": 0
      }
    ]
  }
</script>