<template>
  <q-card bordered class="col-lg-4 col-md-4 col-sm-6">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-list dense bordered padding>
      <q-item v-for="item in activeItems" :key="item.id">
        <q-input borderless placeholder="Type label here" v-model="item.label">
          <template v-slot:prepend>
            <q-checkbox
              v-model="item.done"
              :val="item.id"
              :checked="item.done"
            />
          </template>
        </q-input>
      </q-item>
    </q-list>
    <q-list>
      <q-item v-for="item in doneItems" :key="item.id">
        <label>
          <q-checkbox v-model="item.done" :val="item.id" :checked="item.done" />
          <del>{{ item.label }}</del>
        </label>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
// import uniqueId from 'lodash-es/uniqueId'

export default {
  name: 'Card',
  props: {
    title: String,
    items: Array
  },
  computed: {
    activeItems: function() {
      return this.items.filter(item => !item.done)
    },
    doneItems: function() {
      return this.items.filter(item => item.done)
    }
  }
}
</script>
