<template>
  <form
    @submit.prevent="saveSettings"
    class="space-y-6 p-6 bg-white shadow-md rounded-lg ml-10 col-span-12 md:col-span-8"
  >
    <div class="space-y-2">
      <label for="duration" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Visit Duration</label
      >
      <select
        v-model="settings.duration"
        id="duration"
        class="bg-gray-50 cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled>Select</option>
        <option value="15">15 min</option>
        <option value="30">30 min</option>
        <option value="45">45 min</option>
        <option value="60">60 min</option>
        <option value="90">90 min</option>
      </select>
    </div>

    <div class="space-y-2">
      <label for="slots" class="block text-sm font-medium text-gray-700"
        >No. of Booking / Session</label
      >
      <input
        type="number"
        id="slots"
        v-model="settings.slots"
        min="1"
        class="block cursor-pointer w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <div class="flex items-center">
      <input
        id="videoCall"
        type="checkbox"
        v-model="settings.allowVideoCall"
        class="h-4 w-4 cursor-pointer text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      />
      <label for="videoCall" class="ml-2 cursor-pointer block text-sm text-gray-900"
        >Allow video tour call</label
      >
    </div>

    <div>
      <button
        type="submit"
        class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Settings
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    let settings = reactive({
      duration: '30',
      slots: 1,
      allowVideoCall: false
      // Additional fields can be added here for weekdays/times
    })

    const saveSettings = () => {
      localStorage.setItem('schedulerSettings', JSON.stringify(settings))
    }

    const loadSettings = () => {
      const saved = localStorage.getItem('schedulerSettings')
      if (saved) {
        settings = JSON.parse(saved)
      }
    }

    return {
      settings,
      saveSettings,
      loadSettings
    }
  }
})
</script>

<style scoped></style>
