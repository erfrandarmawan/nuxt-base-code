<template>
  <div class="drawer font-poppins">
    <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />
    
    <!-- Page content -->
    <div class="drawer-content flex flex-col w-full min-h-screen bg-base-200">
      <div class="flex flex-row p-5 items-center gap-3 bg-white">
        <label for="sidebar-drawer" class="drawer-button">
          <ClientOnly><font-awesome-icon :icon="['fas', 'bars']" class="h-4 w-4 hover:text-primary duration-300 cursor-pointer"></font-awesome-icon></ClientOnly>
        </label>

        <span class="text-2xl uppercase">Panel Title</span>
      </div>

      <!-- Content template -->
      <slot />
      <!-- ./Content template -->
    </div>
    <!-- ./Page content -->


    <!-- Sidebar -->
    <div class="drawer-side">
      <label for="sidebar-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <li>
          <a href="/panel" class="hover:text-primary duration-300">
            <ClientOnly><font-awesome-icon :icon="['fas', 'chart-simple']" class="h-4 w-4"></font-awesome-icon></ClientOnly>
            Dashboard
          </a>
        </li>
        
        <li>
          <a href="/panel/blogs" class="hover:text-primary duration-300">
            <ClientOnly><font-awesome-icon :icon="['fas', 'rss']" class="h-4 w-4"></font-awesome-icon></ClientOnly>
            Blogs
          </a>
        </li>

        <li>
          <a href="/panel/logout" class="hover:text-primary duration-300">
            <ClientOnly><font-awesome-icon :icon="['fas', 'right-from-bracket']" class="h-4 w-4"></font-awesome-icon></ClientOnly>
            Logout
          </a>
        </li>
      </ul>
    </div>
    <!-- ./Sidebar -->
  </div>
</template>
