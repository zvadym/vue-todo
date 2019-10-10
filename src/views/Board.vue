<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <Card :title="cardTitle" :items="items" />
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
  data: function() {
    return {
      cardTitle: 'Default card'
    }
  },
  computed: {
    ...mapState(['items'])
  }
}
</script>
