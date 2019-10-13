<template>
  <q-card bordered class="col-lg-4 col-md-4 col-sm-6">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-list dense bordered padding>
      <draggable
        v-model="activeItems"
        handler=".drag"
        animation="150"
        ghost-class="ghost"
      >
        <Item
          v-for="item in activeItems"
          :key="item.id"
          :item="item"
          @updateLabel="updateLabel"
          @updateStatus="changeStatus"
          @remove="deleteItem"
        />
      </draggable>

      <q-item>
        <q-item-section side>
          <q-icon disable name="drag_indicator"></q-icon>
        </q-item-section>
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
import draggable from 'vuedraggable'
import orderBy from 'lodash-es/orderBy'

export default {
  name: 'Card',
  props: {
    id: [String, Number]
  },
  components: {
    Item,
    draggable
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      title: () => 'Default',
      items: state => state.items
    }),

    activeItems: {
      get() {
        return orderBy(this.items.filter(item => !item.done), 'order', 'asc')
      },
      set(value) {
        this.updateOrder(value.map(item => item.id))
      }
    },
    doneItems: function() {
      return this.items.filter(item => item.done)
    }
  },
  methods: {
    ...mapActions({
      storeAdd: 'addItem',
      storeUpdate: 'updateItem',
      storeDelete: 'deleteItem',
      updateOrder: 'updateOrder'
    }),
    addItem: function(event) {
      const itemValue = event.target.value
      this.storeAdd({
        label: itemValue
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

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
