<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <Card v-for="card in cards" :cardData="card" :key="card.id" />
    </div>
    <q-btn
      round
      color="primary"
      icon="add"
      size="lg"
      title="Create a new card"
      class="fixed-bottom-right q-ma-sm"
      @click="createCard"
    />
  </q-page>
</template>

<style></style>

<script>
import { mapState, mapActions } from 'vuex'
import Card from '@/components/Card.vue'

export default {
  name: 'Board',
  components: {
    Card
  },
  computed: {
    ...mapState(['cards'])
  },
  methods: {
    ...mapActions(['createCard', 'bindCards'])
  },
  mounted: function() {
    this.bindCards() // firebase sync

    if (!this.cards.length) {
      // Create first card
      this.createCard()
    }
  }
}
</script>
