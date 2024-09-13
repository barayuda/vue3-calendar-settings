<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>This projects is generated using Vue3 create app and for test to LittleLives.</h3>
  </div>
</template>

<style scoped>
h1 {
  @apply text-3xl font-bold relative -top-3;
}

h3 {
  @apply text-lg;
}

.greetings h1,
.greetings h3 {
  @apply text-center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    @apply text-left;
  }
}
</style>
