<template>
  <ul class="tabs">
    <li 
      v-for="tab in tabs" 
      :key="tab.name" 
      :class="{ active: tab.name === currentTab.name }"
      @click="$emit('select', tab)"
    >
      {{ tab.name }}
    </li>
    <div class="logout" @click="exit">
      Logout
    </div>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  currentTab: {
    type: Object,
    required: true
  }
})

const exit = () => {
  fetch('/', {
    headers: {
      'Authorization': 'Basic logout' 
    }
  }).finally(() => {
    window.location.reload()
  })
}
</script>

<style scoped>
.tabs {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 14px;
}

.tabs li {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #181818;
  color: #aaa;
  transition: all 0.3s ease;
  border-radius: 14px 14px 0 0;
}

.tabs li.active {
  color: #fff;
  background-color: #242424;
}

.tabs li:hover {
  color: #fff;
}

@media (prefers-color-scheme: light) {
  .tabs li {
    background-color: #f6f6f6;
    color: #555;
  }
  .tabs li.active {
    background-color: #ffffff;
    color: #000;
  }
  .tabs li:hover {
    color: #000;
  }
}

.logout {
  margin-left: auto;
  padding: 10px 20px;
  cursor: pointer;
  color: #aaa;
  transition: color 0.3s ease;
}

.logout:hover {
  color: #ff4444;
}

@media (prefers-color-scheme: light) {
  .logout {
    color: #555;
  }
}
</style>