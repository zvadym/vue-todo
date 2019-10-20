<template>
  <q-card dark bordered class="bg-blue-9 q-ma-lg">
    <q-card-section>
      <div class="text-h6">Sign in</div>
      <div class="text-subtitle2">
        Please provide your data to be able to use TODO app
      </div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      <section id="firebaseui-auth-container"></section>
    </q-card-section>
  </q-card>
</template>

<script>
import firebase from '@/services/firebase/index'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { mapActions } from 'vuex'

export default {
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    })
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user)
      this.setUser(user)
    })
  },
  methods: {
    ...mapActions({ setUser: 'users/setUser' })
  }
}
</script>
