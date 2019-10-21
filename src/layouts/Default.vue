<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="q-pa-sm">
      <q-toolbar>
        <q-toolbar-title>Vue TODO app</q-toolbar-title>
        <NetworkWatcher class="q-mr-lg" />
        <UserInfo />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'
import NetworkWatcher from '@/components/NetworkWatcher.vue'

export default {
  name: 'LayoutDefault',
  data() {
    return {}
  },
  components: {
    UserInfo,
    NetworkWatcher
  }
}
</script>
