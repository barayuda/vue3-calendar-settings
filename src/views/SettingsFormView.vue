<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Create Time Slots</h2>
    <form @submit.prevent="saveSettings">
      <div class="mb-4">
        <label class="block text-sm">Visit Duration</label>
        <select v-model="duration" class="form-select">
          <option value="15">15 min</option>
          <option value="30">30 min</option>
          <option value="45">45 min</option>
          <option value="60">60 min</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-sm">No. of Bookings/Session</label>
        <input type="number" v-model="numberOfBookings" class="form-input" min="1" />
      </div>
      <div class="mb-4">
        <label class="block text-sm">
          <input type="checkbox" v-model="allowVideoTour" /> Allow video tour call
        </label>
      </div>
      <div class="mb-4">
        <label class="block text-sm">Available Days</label>
        <div v-for="day in days" :key="day.value" class="flex items-center">
          <input type="checkbox" v-model="selectedDays" :value="day.value" />
          <span class="ml-2">{{ day.label }}</span>
        </div>
      </div>
      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const duration = ref(30)
    const numberOfBookings = ref(1)
    const allowVideoTour = ref(false)
    const selectedDays = ref<string[]>([])

    const days = [
      { value: 'mon', label: 'Monday' },
      { value: 'tue', label: 'Tuesday' },
      { value: 'wed', label: 'Wednesday' },
      { value: 'thu', label: 'Thursday' },
      { value: 'fri', label: 'Friday' },
      { value: 'sat', label: 'Saturday' },
      { value: 'sun', label: 'Sunday' }
    ]

    const saveSettings = () => {
      // Persist data locally, can use localStorage or IndexedDB
      const settings = {
        duration: duration.value,
        numberOfBookings: numberOfBookings.value,
        allowVideoTour: allowVideoTour.value,
        selectedDays: selectedDays.value
      }
      localStorage.setItem('schedulerSettings', JSON.stringify(settings))
    }

    return {
      duration,
      numberOfBookings,
      allowVideoTour,
      selectedDays,
      days,
      saveSettings
    }
  }
})
</script>

<style scoped>
.form-input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
  width: 100%;
}
.form-select {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
  width: 100%;
}
</style>
