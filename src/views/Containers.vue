<template>
  <div>
    <h1>Containers</h1>

    <div v-for="c in containers" :key="c.ID">
      <div>
        <strong>{{ c.Names }}</strong> | <span :class="c.State == 'running' ? 'running' : 'stopped'">{{ c.Status }}</span>
      </div>

      <details>
        <summary>Details</summary>
        <div>
          <p v-for="(value, key) in c" :key="key">
            <b>{{ key }}:</b> {{ value }}
          </p>
        </div>
      </details>

      <div>
        <button v-if="c.State == 'running'" @click="handleAction(c.ID, 'stop')">
          Stop
        </button>
        <button v-else @click="handleAction(c.ID, 'start')">
          Start
        </button>
      </div>

      <hr />
    </div>
    
    <button @click="prune">Prune System</button>
  </div>
</template>

<script setup vapor>
import { ref, onUnmounted } from 'vue'

const containers = ref([])

const load = async () => {
  const res = await fetch('/api/containers')
  containers.value = await res.json()
}

const handleAction = async (id, action) => {
  if (action === 'stop' && !confirm('You want to stop container?')) return
  
  await fetch('/api/action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, action })
  })
  load()
}

const prune = async () => {
  if (confirm('Clear system?')) {
    await fetch('/api/prune', { method: 'POST' })
    alert('System pruned')
    load()
  }
}

load()
let intervalId = setInterval(load, 3000)
onUnmounted(() => clearInterval(intervalId))
</script>

<style scoped>
.running {
  background-color: #155724;
  color: #d4edda;
  border-radius: 4px;
}

.stopped {
  background-color: #721c24;
  color: #f8d7da;
  border-radius: 8px;
}

@media (prefers-color-scheme: light) {
  .running {
    background-color: #c3e6cb;
    color: #155724;
  }
  .stopped {
    background-color: #f5c6cb;
    color: #721c24;
  }
}
</style>