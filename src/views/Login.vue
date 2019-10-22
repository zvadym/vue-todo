<template>
  <div class="row justify-center">
    <q-card dark bordered class="bg-grey-8 q-ma-lg col-md-4 col-sm-7 col-xs-11">
      <q-card-section>
        <div class="text-h6">Sign in</div>
        <div class="text-subtitle2">
          After login you will be able to syncronize your tasks between all your
          devices.
        </div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <section id="firebaseui-auth-container"></section>
      </q-card-section>
    </q-card>
  </div>
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
