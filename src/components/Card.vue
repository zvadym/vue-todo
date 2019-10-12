<template>
  <q-card bordered class="col-lg-4 col-md-4 col-sm-6">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-list dense bordered padding>
      <Item
        v-for="item in activeItems"
        :key="item.id"
        :item="item"
        @updateLabel="updateLabel"
        @updateStatus="changeStatus"
        @remove="deleteItem"
      />

      <q-item>
        <q-input borderless placeholder="Add item" @change="addItem">
          <template v-slot:prepend>
            <q-checkbox disable :checked="false" value />
          </template>
        </q-input>
      </q-item>
    </q-list>
    <q-list>
      <Item
        v-for="item in doneItems"
        :key="item.id"
        :item="item"
        @updateStatus="changeStatus"
        @remove="deleteItem"
      />
    </q-list>
  </q-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Item from '@/components/Item'

export default {
  name: 'Card',
  props: {
    id: [String, Number]
  },
  components: {
    Item
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      title: () => 'Default',
      items: state => state.items
    }),

    activeItems: function() {
      return this.items.filter(item => !item.done)
    },
    doneItems: function() {
      return this.items.filter(item => item.done)
    }
  },
  methods: {
    ...mapActions({
      storeAdd: 'addItem',
      storeUpdate: 'updateItem',
      storeDelete: 'deleteItem'
    }),
    addItem: function(event) {
      const itemValue = event.target.value
      this.storeAdd({
        label: itemValue,
        done: false
      })
    },
    updateLabel: function(id, value) {
      const item = this.items.find(item => item.id === id)
      this.storeUpdate({
        ...item,
        label: value
      })
    },
    changeStatus: function(id) {
      const item = this.items.find(item => item.id === id)
      this.storeUpdate({
        ...item,
        done: !item.done
      })
    },
    deleteItem: function(id) {
      this.storeDelete(this.items.find(item => item.id === id))
    }
  }
}
</script>
