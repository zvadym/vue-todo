<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <Card v-for="card in cards" :cardData="card" :key="card.id" />
    </div>
  </q-page>
</template>

<style></style>

<script>
import { mapState } from 'vuex'
import Card from '@/components/Card.vue'

export default {
  name: 'Board',
  components: {
    Card
  },
  computed: {
    ...mapState(['cards'])
  }
}
</script>
