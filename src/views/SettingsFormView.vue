<template>
  <form
    @submit.prevent="saveSettings"
    class="space-y-6 p-6 bg-white shadow-md rounded-lg ml-10 col-span-5"
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

  <br />

  <div class="space-y-6 p-6 bg-white shadow-md rounded-lg ml-10 col-start-4 col-end-10">
    <h2 class="text-lg font-medium text-gray-900">Availability</h2>
    <p class="text-sm text-gray-500">Set your weekly recurring schedule</p>

    <div v-for="day in days" :key="day.name" class="flex items-center space-x-3">
      <!-- Checkbox for each day -->
      <input
        type="checkbox"
        v-model="day.enabled"
        class="h-5 w-5 cursor-pointer text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      />

      <!-- Day label -->
      <span class="w-16 text-sm text-gray-700">{{ day.name }}</span>

      <!-- Start time select -->
      <select
        v-model="day.startTime"
        class="block cursor-pointer w-56 p-2 text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option class="text-sm text-gray-700" v-for="time in times" :key="time" :value="time">
          {{ time }}
        </option>
      </select>

      <span>-</span>

      <!-- End time select -->
      <select
        v-model="day.endTime"
        class="block cursor-pointer w-56 text-sm text-gray-700 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option class="text-sm text-gray-700" v-for="time in times" :key="time" :value="time">
          {{ time }}
        </option>
      </select>

      <!-- Action buttons -->
      <button @click="removeTimeSlot(day)" class="text-red-500 hover:text-red-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <button @click="duplicateTimeSlot(day)" class="text-gray-500 hover:text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7H8a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 17H6a2 2 0 01-2-2V9a2 2 0 012-2h2m10 10h2a2 2 0 002-2V9a2 2 0 00-2-2h-2"
          />
        </svg>
      </button>

      <button @click="addTimeSlot(day)" class="text-indigo-600 hover:text-indigo-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  </div>
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

    const times = [
      '7:00 am',
      '8:00 am',
      '9:00 am',
      '10:00 am',
      '11:00 am',
      '12:00 pm',
      '1:00 pm',
      '2:00 pm',
      '3:00 pm',
      '4:00 pm',
      '5:00 pm'
    ]

    const days = reactive([
      { name: 'Mon', enabled: true, startTime: '9:00 am', endTime: '10:00 am' },
      { name: 'Tue', enabled: true, startTime: '9:00 am', endTime: '10:00 am' },
      { name: 'Wed', enabled: true, startTime: '9:00 am', endTime: '10:00 am' },
      { name: 'Thu', enabled: true, startTime: '9:00 am', endTime: '10:00 am' },
      { name: 'Fri', enabled: true, startTime: '9:00 am', endTime: '10:00 am' }
    ])

    const removeTimeSlot = (day: any) => {
      console.log('Removing time slot for', day.name)
    }

    const duplicateTimeSlot = (day: any) => {
      console.log('Duplicating time slot for', day.name)
    }

    const addTimeSlot = (day: any) => {
      console.log('Adding time slot for', day.name)
    }

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
      loadSettings,
      // for list of time slots
      days,
      times,
      removeTimeSlot,
      duplicateTimeSlot,
      addTimeSlot
    }
  }
})
</script>

<style scoped></style>
