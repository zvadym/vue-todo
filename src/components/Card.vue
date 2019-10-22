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
        v-model="activeTasks"
        handle=".drag"
        animation="150"
        ghost-class="ghost"
      >
        <Task
          v-for="task in activeTasks"
          :key="task.id"
          :task="task"
          @updateTitle="updateTaskTitle"
          @updateStatus="changeTaskStatus"
          @remove="deleteTask"
        />
      </draggable>

      <q-item>
        <q-item-section side>&nbsp;</q-item-section>
        <q-item-section>
          <q-input borderless placeholder="Add task" @change="addTask">
            <template v-slot:prepend>
              <q-icon disable name="add" class="q-ml-lg q-mr-sm" />
            </template>
          </q-input>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <Task
        v-for="task in doneTasks"
        :key="task.id"
        :task="task"
        @updateStatus="changeTaskStatus"
        @remove="deleteTask"
      />
    </q-list>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import Task from '@/components/Task'
import draggable from 'vuedraggable'
import _ from 'lodash-es'

export default {
  name: 'Card',
  props: {
    card: [Object]
  },
  components: {
    Task,
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
    tasks: function() {
      return _.orderBy(this.card.tasks, 'order', 'asc')
    },
    activeTasks: {
      get() {
        return this.tasks.filter(task => !task.done)
      },
      set(value) {
        this.updateOrder({
          card: _.cloneDeep(this.card),
          orderedIds: value.map(task => task.id)
        })
      }
    },
    doneTasks: function() {
      return this.tasks.filter(task => task.done)
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
      storeAdd: 'todo/addTask',
      storeUpdate: 'todo/updateTask',
      storeDelete: 'todo/deleteTask',
      updateOrder: 'todo/updateTasksOrder',
      updateCardData: 'todo/updateCard',
      removeCard: 'todo/removeCard'
    }),
    addTask: function(event) {
      this.storeAdd({
        card: _.cloneDeep(this.card),
        taskData: {
          title: event.target.value
        }
      })
    },
    updateTaskTitle: function(id, value) {
      this.storeUpdate({
        card: _.cloneDeep(this.card),
        task: {
          ...this.tasks.find(task => task.id === id),
          title: value
        }
      })
    },
    changeTaskStatus: function(id) {
      const task = this.tasks.find(task => task.id === id)
      const lastTask = _.last(task.done ? this.activeTasks : this.doneTasks)
      this.storeUpdate({
        card: _.cloneDeep(this.card),
        task: {
          ...task,
          done: !task.done,
          order: lastTask ? lastTask.order + 1 : 1
        }
      })
    },
    deleteTask: function(id) {
      this.storeDelete({
        card: _.cloneDeep(this.card),
        deleteTaskId: id
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
