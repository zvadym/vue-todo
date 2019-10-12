<template>
  <q-item>
    <q-item-section avatar>
      <q-checkbox
        @input="changeStatus"
        :value="item.done"
        :checked="item.done"
      />
    </q-item-section>
    <q-item-section>
      <q-input v-if="!item.done" borderless v-model="label" />
      <label v-else>
        <del>{{ item.label }}</del>
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
    label: {
      get() {
        return this.item.label
      },
      set(value) {
        this.$emit('updateLabel', this.item.id, value)
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
