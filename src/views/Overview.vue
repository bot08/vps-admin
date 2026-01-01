<template>
  <div>
    <h1>Overview Stats</h1>
    {{ stats.value }}
    <p>
      <b>Uptime:</b> {{ formatUptime(stats.uptime) }}
    </p>
    <p>
      <b>Disk:</b> {{ formatDisk(stats.disk) }}
    </p>
    <p>
      <b>Memory:</b> {{ formatMemory(stats.memory) }}
    </p>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const stats = ref({
  uptime: 'Loading...',
  disk: 'Loading...',
  memory: 'Loading...',
})

// Formaters
const formatUptime = (raw) => raw.replace('up ', '')
const formatDisk = (raw) => {
  const parts = raw.split(/\s+/)
  return parts.length > 4 ? `${parts[4]} (${parts[2]} / ${parts[1]})` : raw
}
const formatMemory = (raw) => {
  const parts = raw.split(/\s+/)
  return parts.length > 2 ? `${parts[2]} / ${parts[1]}` : raw
}

const loadStats = async () => {
  const res = await fetch('/api/stats')
  const data = await res.json()
  
  stats.value = data
}

loadStats()
let intervalId = setInterval(loadStats, 3000)
onUnmounted(() => clearInterval(intervalId))
</script>