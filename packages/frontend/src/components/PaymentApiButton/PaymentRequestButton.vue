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

  methods: {
    async show() {
      try{
        const paymentRequest = new PaymentRequest(paymentMethods, transactionDetails, infoReturned)
        console.log('paymentRequest', paymentRequest)

        paymentRequest.onshippingaddresschange = e => e.updateWith(this.updateAddress(transactionDetails, paymentRequest));
        paymentRequest.onshippingoptionchange = e => e.updateWith(this.updateShippingOption(transactionDetails, paymentRequest.shippingOption));
        
        const response = await paymentRequest.show()
        // send response to payment processor
        console.log(response)
        this.$emit('payed', response)
        response.complete('success') 
      } catch (err) {
        console.log(err)
        this.$emit('canceled', err)
      }
    },

    updateAddress(transactionDetails, paymentRequest) {
      console.log('updateAddress', paymentRequest)

      return transactionDetails
    },

    updateShippingOption(transactionDetails, selectedShippingOption) {
      console.log('updateShippingOption', selectedShippingOption)

      const updatedTransactionDetails = {
        ...transactionDetails,
        shippingOptions: transactionDetails.shippingOptions.map(shippingOption => ({
          ...shippingOption,
          selected: shippingOption.id === selectedShippingOption
        }))
      }

      return updatedTransactionDetails
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
