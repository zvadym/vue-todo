<template>
  <q-item>
    <q-item-section side>
      <q-icon v-if="!item.done" name="drag_indicator" class="drag" />
      <div v-else class="q-mr-lg" />
    </q-item-section>
    <q-item-section side>
      <q-checkbox
        @input="changeStatus"
        :value="item.done"
        :checked="item.done"
      />
    </q-item-section>
    <q-item-section>
      <q-input v-if="!item.done" borderless v-model="title" />
      <label v-else>
        <del>{{ item.title }}</del>
      </label>
    </q-item-section>
    <q-item-section side>
      <q-btn round dense flat size="xs" icon="clear" @click="remove" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: [Object]
  },
  computed: {
    title: {
      get() {
        return this.item.title
      },
      set(value) {
        this.$emit('updateTitle', this.item.id, value)
      }
    }
  },
  methods: {
    changeStatus() {
      this.$emit('updateStatus', this.item.id)
    },
    remove() {
      this.$emit('remove', this.item.id)
    }
  }
}
</script>

<style scoped>
.drag {
  cursor: move;
}
</style>
