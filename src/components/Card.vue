<template>
  <q-card bordered class="col-md-5 col-sm-11">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="card-title text-h6 col">
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
        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable @click="removeCard(card)">
                  <q-item-section>Remove Card</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>
    <q-list dense bordered padding>
      <draggable
        v-model="activeItems"
        handle=".drag"
        animation="150"
        ghost-class="ghost"
      >
        <Item
          v-for="item in activeItems"
          :key="item.id"
          :item="item"
          @updateTitle="updateItemTitle"
          @updateStatus="changeItemStatus"
          @remove="deleteItem"
        />
      </draggable>

      <q-item>
        <q-item-section side>&nbsp;</q-item-section>
        <q-item-section>
          <q-input borderless placeholder="Add item" @change="addItem">
            <template v-slot:prepend>
              <q-icon disable name="add" class="q-ml-lg q-mr-sm" />
            </template>
          </q-input>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <Item
        v-for="item in doneItems"
        :key="item.id"
        :item="item"
        @updateStatus="changeItemStatus"
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
    card: [Object]
  },
  components: {
    Item,
    draggable
  },
  data() {
    return {
      editTitle: false,
      newTitle: ''
    }
  },
  computed: {
    title: {
      get() {
        return this.card.title
      },
      set(value) {
        this.newTitle = value
      }
    },
    items: function() {
      return _.orderBy(this.card.items, 'order', 'asc')
    },
    activeItems: {
      get() {
        return this.items.filter(item => !item.done)
      },
      set(value) {
        this.updateOrder({
          card: _.cloneDeep(this.card),
          orderedIds: value.map(item => item.id)
        })
      }
    },
    doneItems: function() {
      return this.items.filter(item => item.done)
    }
  },
  watch: {
    editTitle: function(isEditMode) {
      if (!isEditMode) {
        this.updateCardData({ ...this.card, title: this.newTitle })
      }
    }
  },
  methods: {
    ...mapActions({
      storeAdd: 'todo/addItem',
      storeUpdate: 'todo/updateItem',
      storeDelete: 'todo/deleteItem',
      updateOrder: 'todo/updateItemsOrder',
      updateCardData: 'todo/updateCard',
      removeCard: 'todo/removeCard'
    }),
    addItem: function(event) {
      this.storeAdd({
        card: _.cloneDeep(this.card),
        itemData: {
          title: event.target.value
        }
      })
    },
    updateItemTitle: function(id, value) {
      this.storeUpdate({
        card: _.cloneDeep(this.card),
        item: {
          ...this.items.find(item => item.id === id),
          title: value
        }
      })
    },
    changeItemStatus: function(id) {
      const item = this.items.find(item => item.id === id)
      const lastItem = _.last(item.done ? this.activeItems : this.doneItems)
      this.storeUpdate({
        card: _.cloneDeep(this.card),
        item: {
          ...item,
          done: !item.done,
          order: lastItem ? lastItem.order + 1 : 1
        }
      })
    },
    deleteItem: function(id) {
      this.storeDelete({
        card: _.cloneDeep(this.card),
        deleteItemId: id
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
