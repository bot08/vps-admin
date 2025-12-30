<template>
  <div>
    <h1>Containers</h1>

    <div v-for="c in containers" :key="c.ID">
      <div>
        <strong>{{ c.Names }}</strong> / <span>{{ c.Status }}</span>
      </div>

      <details>
        <summary>Container Details</summary>
        <ul>
          <li>Image: {{ c.Image }}</li>
          <li>Ports: {{ c.Ports || 'none' }}</li>
          <li>Created: {{ c.CreatedAt }}</li>
        </ul>
      </details>

      <details>
        <summary>Raw JSON</summary>
        <pre>{{ c }}</pre>
      </details>

      <div>
        <button v-if="c.State === 'running'" @click="handleAction(c.ID, 'stop')">
          Stop
        </button>
        <button v-else @click="handleAction(c.ID, 'start')">
          Start
        </button>
      </div>
    </div>

    <hr>
    
    <button @click="prune">Prune System</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const containers = ref([])

const load = async () => {
  const res = await fetch(`/api/containers`)
  containers.value = await res.json()
}

const handleAction = async (id, action) => {
  if (action === 'stop' && !confirm('You want to stop container?')) return
  
  await fetch(`/api/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, action })
  })
  load()
}

const prune = async () => {
  if (confirm('Clear system?')) {
    await fetch(`/api/prune`, { method: 'POST' })
    load()
  }
}

load()
</script>