<template>
  <q-page class="flex flex-center">
    <Card :title="cardTitle" :items="cardItems" />
  </q-page>
</template>

<style></style>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'Board',
  components: {
    Card
  }
}
</script>
