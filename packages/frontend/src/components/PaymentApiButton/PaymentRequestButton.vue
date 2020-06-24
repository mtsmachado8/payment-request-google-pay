<template>
  <button :onClick="show" class='payment-request-button'>Comprar</button>
</template>

<script>
import { paymentMethods, transactionDetails, infoReturned } from './payConfig'

export default {
  props: {
    id: {
      type: String,
      required: false,
      default: 'google-pay-button' 
    },
    paymentMethods: {
      type: Object,
      required: true,
      default: paymentMethods
    },
    transactionDetails: {
      type: Object,
      required: true,
      default: transactionDetails
    },
    infoReturned: {
      type: Object,
      required: true,
      default: infoReturned
    }
  },

  setup () {
    const paymentRequest = new PaymentRequest(paymentMethods, transactionDetails, infoReturned)

    return {
      paymentRequest
    }
  },

  methods: {
    async show() {
      console.log('paymentRequest', this.paymentRequest)
      this.paymentRequest.show()
        .then(paymentResponse => {
          // send response to payment processor
          console.log(paymentResponse)
          this.$emit('payed', paymentResponse)
          paymentResponse.complete('success')
        })
        .catch(e => {
          console.log(e)
          this.$emit('canceled', e)
          this.paymentRequest.complete('fail')
        })
    }
  }
}
</script>

<style>
.payment-request-button {
  margin-bottom: 2px;

  border: 0;
  border-radius: 4px;
  color:white;
  background-color: #000;
  box-shadow: none;
  padding: 12px 24px 10px;
}

</style>
