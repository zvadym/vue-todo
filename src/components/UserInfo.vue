<template>
  <div v-if="user">
    <q-btn round color glossy icon="person" />
    <q-menu transition-show="flip-right" transition-hide="flip-left">
      <q-list style="min-width: 120px">
        <q-item>
          <q-item-section>{{ user.name }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>{{ user.email }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable @click="signOut">
          <q-item-section>Sign Out</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '@/services/firebase'

export default {
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['setUser']),
    signOut() {
      firebase.auth().signOut()
      this.setUser(null)
    }
  }
}
</script>
