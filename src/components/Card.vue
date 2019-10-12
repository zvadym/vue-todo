<template>
  <q-card bordered class="col-lg-4 col-md-4 col-sm-6">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-list dense bordered padding>
      <q-item v-for="item in activeItems" :key="item.id">
        <q-input
          borderless
          @input="
            val => {
              updateLabel(item.id, val)
            }
          "
          :value="item.label"
        >
          <template v-slot:prepend>
            <q-checkbox
              @input="changeStatus(item.id)"
              :value="item.id"
              :checked="item.done"
            />
          </template>
          <template v-slot:append>
            <q-btn
              round
              dense
              flat
              size="xs"
              icon="clear"
              @click="deleteItem(item.id)"
            />
          </template>
        </q-input>
      </q-item>
      <q-item>
        <q-input borderless placeholder="Add item" @change="addItem">
          <template v-slot:prepend>
            <q-checkbox disable :checked="false" value />
          </template>
        </q-input>
      </q-item>
    </q-list>
    <q-list>
      <q-item v-for="item in doneItems" :key="item.id">
        <q-item-section>
          <label>
            <q-checkbox @input="changeStatus(item.id)" :value="item.done" />
            <del>{{ item.label }}</del>
          </label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            round
            dense
            flat
            size="xs"
            icon="clear"
            class="float-right"
            @click="deleteItem(item.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Card',
  props: {
    id: [String, Number]
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
