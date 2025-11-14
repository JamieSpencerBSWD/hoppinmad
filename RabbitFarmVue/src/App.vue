<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>
<template>
  <main>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/generate">Generate</RouterLink>
    </nav>
  </main>
  <RouterView />
</template>
<script></script>