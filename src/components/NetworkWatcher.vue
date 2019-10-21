<template>
  <q-icon v-show="!isOnline" class="text-red" size="lg" name="wifi_off" />
</template>

<script>
export default {
  computed: {
    isOnline() {
      return this.$store.getters.isOnline
    }
  },
  mounted() {
    this.$store.dispatch('updateNetworkStatus')
    window.addEventListener('online', () =>
      this.$store.dispatch('updateNetworkStatus')
    )
    window.addEventListener('offline', () =>
      this.$store.dispatch('updateNetworkStatus')
    )
  }
}
</script>
