<template>
  <q-card>
    <q-card-section>{{ title }}</q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: String
  }
}
</script>
