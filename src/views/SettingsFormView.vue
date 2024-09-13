<template>
  <div class="p-6 bg-white shadow-md rounded-lg space-y-4 ml-10 col-span-5">
    <h2 class="text-lg font-medium text-gray-900">Scheduler Settings</h2>

    <!-- Duration Selection -->
    <div class="space-y-2">
      <label for="duration" class="block text-sm font-medium text-gray-700"
        >Booking Slot Duration</label
      >
      <select
        v-model="settings.duration"
        id="duration"
        class="block cursor-pointer text-gray-500 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="15">15 min</option>
        <option value="30">30 min</option>
        <option value="45">45 min</option>
        <option value="60">60 min</option>
        <option value="90">90 min</option>
      </select>
    </div>

    <!-- Booking Slot Number -->
    <div class="space-y-2">
      <label for="slots" class="block text-sm font-medium text-gray-700"
        >Number of Booking Slots / Session</label
      >
      <input
        type="number"
        id="slots"
        v-model="settings.slots"
        min="1"
        class="block cursor-pointer text-gray-500 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <!-- Allow Video Call -->
    <div class="flex items-center">
      <input
        id="videoCall"
        type="checkbox"
        v-model="settings.allowVideoCall"
        class="h-4 w-4 cursor-pointer text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      />
      <label for="videoCall" class="cursor-pointer ml-2 block text-sm text-gray-900"
        >Allow video tour call</label
      >
    </div>

    <hr class="my-10" />

    <h2 class="text-lg font-medium text-gray-900">Availability</h2>
    <small class="text-sm text-gray-800">Set your weekly recurring schedules</small>

    <!-- Days and Time Slots -->
    <div v-for="(day, index) in days" :key="index" class="flex items-center space-x-3 mt-4">
      <input
        type="checkbox"
        v-model="day.enabled"
        class="h-5 w-5 cursor-pointer text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
      />

      <span class="w-16 text-sm text-gray-700">{{ day.name }}</span>

      <select
        v-model="day.startTime"
        class="block w-50 p-2 text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option class="text-sm text-gray-500" v-for="time in times" :key="time" :value="time">
          {{ time }}
        </option>
      </select>

      <span>-</span>

      <input
        type="text"
        :value="calculateEndTime(day.startTime)"
        class="block w-32 text-gray-500 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        disabled
      />

      <button @click="removeTimeSlot(index)" class="text-red-500 hover:text-red-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
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

      <button @click="addTimeSlot(index)" class="text-indigo-600 hover:text-indigo-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
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

    <!-- Submit Button -->
    <div>
      <button
        @click="saveSettings"
        type="submit"
        class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Settings
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'

export default defineComponent({
  setup() {
    // Available times for selection
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

    // Days configuration
    const days = reactive([
      { name: 'Mon', enabled: true, startTime: '9:00 am' },
      { name: 'Tue', enabled: true, startTime: '9:00 am' },
      { name: 'Wed', enabled: true, startTime: '9:00 am' },
      { name: 'Thu', enabled: true, startTime: '9:00 am' },
      { name: 'Fri', enabled: true, startTime: '9:00 am' }
    ])

    // Settings object
    const settings = reactive({
      duration: 30, // Default duration 30 min
      slots: 1, // Default 1 slot
      allowVideoCall: false // Video call is initially disabled
    })

    // Calculate the end time based on duration and start time
    const calculateEndTime = (startTime: string) => {
      const [time, period] = startTime.split(' ')
      let [hours, minutes] = time.split(':').map(Number)
      if (period === 'pm' && hours !== 12) hours += 12
      if (period === 'am' && hours === 12) hours = 0

      const newMinutes = minutes + settings.duration
      const newHours = hours + Math.floor(newMinutes / 60)
      const finalMinutes = newMinutes % 60
      const finalTime = newHours >= 12 ? 'pm' : 'am'

      return `${(newHours % 12 || 12).toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')} ${finalTime}`
    }

    // Add time slot for a day
    const addTimeSlot = (index: number) => {
      days.splice(index + 1, 0, {
        ...days[index],
        startTime: '10:00 am' // Default new time for demo purposes
      })
    }

    // Remove time slot for a day
    const removeTimeSlot = (index: number) => {
      if (days.length > 1) {
        days.splice(index, 1)
      } else {
        // Disable the slot if there's only one left
        days[index].enabled = false
      }
    }

    // Save settings to localStorage
    const saveSettings = () => {
      localStorage.setItem('schedulerSettings', JSON.stringify(settings))
      localStorage.setItem('schedulerDays', JSON.stringify(days))
      alert('Settings saved to localStorage')
    }

    // Load settings from localStorage on mount
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('schedulerSettings')
      const savedDays = localStorage.getItem('schedulerDays')

      if (savedSettings) {
        Object.assign(settings, JSON.parse(savedSettings))
      }

      if (savedDays) {
        Object.assign(days, JSON.parse(savedDays))
      }
    }

    // Load the saved settings when the component is mounted
    onMounted(() => {
      loadSettings()
    })

    return {
      settings,
      days,
      times,
      calculateEndTime,
      addTimeSlot,
      removeTimeSlot,
      saveSettings
    }
  }
})
</script>

<style scoped></style>
