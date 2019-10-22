<template>
  <q-item>
    <q-item-section side>
      <q-icon v-if="!task.done" name="drag_indicator" class="drag" />
      <div v-else class="q-mr-lg" />
    </q-item-section>
    <q-item-section side>
      <q-checkbox
        @input="changeStatus"
        :value="task.done"
        :checked="task.done"
      />
    </q-item-section>
    <q-item-section>
      <q-input v-if="!task.done" borderless v-model="title" />
      <label v-else>
        <del>{{ task.title }}</del>
      </label>
    </q-item-section>
    <q-item-section side>
      <q-btn round dense flat size="xs" icon="clear" @click="remove" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: [Object]
  },
  computed: {
    title: {
      get() {
        return this.task.title
      },
      set(value) {
        this.$emit('updateTitle', this.task.id, value)
      }
    }
  },
  methods: {
    changeStatus() {
      this.$emit('updateStatus', this.task.id)
    },
    remove() {
      this.$emit('remove', this.task.id)
    }
  }
}
</script>

<style scoped>
.drag {
  cursor: move;
}
</style>
