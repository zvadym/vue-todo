<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <Card v-for="card in cards" :card="card" :key="card.id" />
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
    ...mapState('todo', ['cards'])
  },
  methods: {
    ...mapActions({
      createCard: 'todo/createCard',
      firebaseBindCards: 'todo/firebaseBindCards'
    })
  },
  mounted: function() {
    // firebase sync
    this.firebaseBindCards().then(() => {
      if (this.cards.length === 0) {
        this.createCard()
      }
    })
  }
}
</script>
