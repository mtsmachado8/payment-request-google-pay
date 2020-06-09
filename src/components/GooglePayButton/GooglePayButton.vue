<template>
  <div :id="id" />
</template>

<script>
import payConfig from './payConfig'

export default {
  props: {
    id: {
      type: String,
      required: false,
      default: 'google-pay-button'
    },
    options: {
      type: Object,
      required: true,
      default: payConfig
    }
  },
  
  data () {
    return {
      paymentsClient: null
    }
  },

  async mounted () {
    this.injectGooglePayScript()
  },

  methods: {
    injectGooglePayScript () {
      if (!this.paymentsClient) {
        const googlePayScript = document.createElement('script')
        googlePayScript.setAttribute('src', 'https://pay.google.com/gp/p/js/pay.js')
        googlePayScript.setAttribute('async', true)
        googlePayScript.setAttribute('defer', true)
        googlePayScript.onload = () => this.onGooglePayLoaded()
        document.head.appendChild(googlePayScript)
      }
    },
    
    async onGooglePayLoaded () {
      const paymentsClient = this.getGooglePaymentsClient()
      paymentsClient
        .isReadyToPay(this.options.readyToPayRequest)
        .then(response => {
          if (response.result) {
            this.addGooglePayButton()
            // @todo prefetch payment data to improve performance after confirming site functionality
            // prefetchGooglePaymentData();
          }
        })
        .catch(err => {
          // show error in developer console for debugging
          console.error(err)
        })
    },

    getGooglePaymentsClient () {
      console.log('getGooglePaymentsClient')
      console.log('paymentsClient', this.paymentsClient)

      if (this.paymentsClient === null) {
        this.paymentsClient = new google.payments.api.PaymentsClient({
          environment: this.options.environment
        })
        console.log('environment', this.options.environment)

      }
      return this.paymentsClient
    },

    addGooglePayButton () {
      console.log('addGooglePayButton')

      const button = this.paymentsClient.createButton({
        onClick: () => this.googlePayButtonClick(),
        buttonColor: this.options.buttonColor
      })
      document.getElementById(this.id).appendChild(button)

      console.log('button')

    },

    googlePayButtonClick () {
      console.log('googlePayButtonClick')
      
      console.log(this.options.paymentDataRequest)
      const paymentsClient = this.getGooglePaymentsClient()
      paymentsClient
        .loadPaymentData(this.options.paymentDataRequest)
        .then(paymentData => {
          this.$emit('payed', paymentData)
        })
        .catch(err => {
          console.error(err)
          if (err.statusCode === 'CANCELED') this.$emit('cancel')
        })
    }
  }
}
</script>