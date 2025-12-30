<template>
  <div>
     <Tabs 
      :tabs="tabs" 
      :currentTab="currentTab"
      @select="currentTab = $event"
    />
    <div class="conteiner">
      <component :is="currentTab.component" />
    </div>
</div>
</template>

<script setup>
import { shallowRef } from 'vue'

import Tabs from './components/Tabs.vue'

import Overview from './views/Overview.vue'
import Containers from './views/Containers.vue'

const tabs = [
  { name: 'Stats', component: Overview },
  { name: 'Containers', component: Containers },
]

const currentTab = shallowRef(tabs[0])

</script>

<style scoped>
.conteiner {
  padding: 32px 40px 20px 40px;
  border-radius: 16px;
  overflow: hidden;
  background-color: #242424;
}

@media (prefers-color-scheme: light) {
  .conteiner {
    background-color: #ffffff;
  }
}

@media (max-width: 768px) {
  .conteiner {
    padding: 16px;
  }
}
</style>
