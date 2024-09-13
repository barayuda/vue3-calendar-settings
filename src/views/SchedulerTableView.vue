<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Scheduler Table</h2>
    <vue-cal :events="events" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default defineComponent({
  components: {
    VueCal
  },
  setup() {
    const events = ref([])

    onMounted(() => {
      const settings = JSON.parse(localStorage.getItem('schedulerSettings') || '{}')
      // Generate events based on settings
      if (settings.selectedDays) {
        settings.selectedDays.forEach((day: string) => {
          // Push mock events to events array based on settings
          events.value.push({
            start: `2023-01-02T09:00:00`,
            end: `2023-01-02T10:00:00`,
            title: `Available`
          })
        })
      }
    })

    return {
      events
    }
  }
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
