<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Barayuda Gautama</template>
    Email:
    <a href="mailto:gede@barayuda.web.id">gede@barayuda.web.id</a>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    This project is using
    <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
    <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a> +
    <a href="https://tailwindcss.com" target="_blank" rel="noopener">Tailwind</a> +
    <a href="https://fullcalendar.io" target="_blank" rel="noopener">Full Calendar</a>
    <br />
    Other instructions are available in <code>README.md</code>.
  </WelcomeItem>
</template>
