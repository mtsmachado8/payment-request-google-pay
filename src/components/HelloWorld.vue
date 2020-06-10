<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <PaymentRequestButton 
    @payed="payed($event)"
    @cancel="cancelled"
  />
  <GooglePayButton 
    @payed="payed($event)"
    @cancel="cancelled"
  />
</template>

<script>
import GooglePayButton from './GooglePayButton'
import PaymentRequestButton from './PaymentRequestButton'

export default {
  name: 'HelloWorld',

  components: {
    GooglePayButton,
    PaymentRequestButton
  },

  props: {
    msg: String
  },

  data() {
    return {
      count: 0
    }
  },

  methods: {
    payed (paymentData) {
      console.log('Payed', paymentData)
    },
    cancelled () {
      console.log('Cancelled')
    }
  }
}
</script>
