<template>
  <main class="server-page">
    <section class="server-wrap">
      <p class="server-kicker">Fight-Lab</p>

      <h1 class="server-title">Server page</h1>

      <p class="server-text">
        General information for the Fight-Lab server.
      </p>

      <p class="server-meta">
        <span>Runtime {{ runtime }}</span>
        <span class="server-meta__dot" aria-hidden="true"></span>
        <code>/server</code>
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Fight-Lab Server'
})
</script>