<template>
  <q-card bordered class="col-md-5 col-sm-11">
    <q-card-section>
      <div class="card-title text-h6">
        <span v-show="!editTitle">{{ title }}</span>
        <q-btn
          v-show="!editTitle"
          flat
          round
          color="primary"
          icon="edit"
          size="sm"
          class="btn-edit q-ml-sm"
          @click="editTitle = true"
        />
        <q-input
          v-show="editTitle"
          v-model="title"
          dense
          @blur="editTitle = false"
          @keypress.enter="editTitle = false"
        />
      </div>
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
        <q-item-section side>&nbsp;</q-item-section>
        <q-input borderless placeholder="Add item" @change="addItem">
          <template v-slot:prepend>
            <q-icon disable name="add" class="q-ml-lg q-mr-sm" />
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
import { mapActions } from 'vuex'
import Item from '@/components/Item'
import draggable from 'vuedraggable'
import _ from 'lodash-es'

export default {
  name: 'Card',
  props: {
    cardData: [Object]
  },
  components: {
    Item,
    draggable
  },
  data() {
    return {
      editTitle: false
    }
  },
  computed: {
    title: {
      get() {
        return this.cardData.title
      },
      set(value) {
        this.updateCardData({ ...this.cardData, title: value })
      }
    },
    items: function() {
      return _.orderBy(this.cardData.items, 'order', 'asc')
    },
    activeItems: {
      get() {
        return this.items.filter(item => !item.done)
      },
      set(value) {
        this.updateOrder({
          cardId: this.cardData.id,
          orderedIds: value.map(item => item.id)
        })
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
      updateOrder: 'updateItemsOrder',
      updateCardData: 'updateCard'
    }),
    addItem: function(event) {
      this.storeAdd({
        cardId: this.cardData.id,
        itemData: {
          label: event.target.value
        }
      })
    },
    updateLabel: function(id, value) {
      const item = this.items.find(item => item.id === id)
      this.storeUpdate({
        cardId: this.cardData.id,
        itemData: {
          ...item,
          label: value
        }
      })
    },
    changeStatus: function(id) {
      const item = this.items.find(item => item.id === id)
      const lastItem = _.last(item.done ? this.activeItems : this.doneItems)
      this.storeUpdate({
        cardId: this.cardData.id,
        itemData: {
          ...item,
          done: !item.done,
          order: lastItem ? lastItem.order + 1 : 1
        }
      })
    },
    deleteItem: function(id) {
      this.storeDelete({
        cardId: this.cardData.id,
        itemData: this.items.find(item => item.id === id)
      })
    }
  }
}
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.card-title .btn-edit {
  display: none;
}
.card-title:hover .btn-edit {
  display: inline-block;
}
</style>
