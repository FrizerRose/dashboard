<template>
  <main class="c-site-main">
    <div class="temp-fixed">
      <p>template 404</p>
    </div>

    <div class="404">
      <h1>404. You seem to have taken a wrong turn</h1>
      <router-link to="/">
        Click here to return to the Homepage
      </router-link>
    </div>

    <router-view />
  </main>
</template>
