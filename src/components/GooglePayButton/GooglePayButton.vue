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
          // recomended not rendering the button
          console.error(err)
        })
    },

    getGooglePaymentsClient () {
      console.log('getGooglePaymentsClient')
      console.log('paymentsClient', this.paymentsClient)

      if (this.paymentsClient === null) {
        this.paymentsClient = new google.payments.api.PaymentsClient({
          environment: this.options.environment,
          // merchantInfo: {
          //   merchantName: "Example Merchant",
          //   merchantId: "01234567890123456789"
          // },
          // paymentDataCallbacks: {
          //   onPaymentAuthorized: this.onPaymentAuthorized,
          //   onPaymentDataChanged: this.onPaymentDataChanged
          // }
        })
        console.log('environment', this.options.environment)

      }
      return this.paymentsClient
    },

    onPaymentAuthorized(paymentData) {
      return new Promise(function(resolve, reject){

      // handle the response
      processPayment(paymentData)
        .then(function() {
          resolve({transactionState: 'SUCCESS'});
        })
        .catch(function() {
            resolve({
            transactionState: 'ERROR',
            error: {
              intent: 'PAYMENT_AUTHORIZATION',
              message: 'Insufficient funds',
              reason: 'PAYMENT_DATA_INVALID'
            }
          });
        });

      });
    },

    onPaymentDataChanged(intermediatePaymentData) {
      return new Promise(function(resolve, reject) {

        let shippingAddress = intermediatePaymentData.shippingAddress;
        let shippingOptionData = intermediatePaymentData.shippingOptionData;
        let paymentDataRequestUpdate = {};

        if (intermediatePaymentData.callbackTrigger == "INITIALIZE" || intermediatePaymentData.callbackTrigger == "SHIPPING_ADDRESS") {
          if(shippingAddress.administrativeArea == "NJ")  {
            paymentDataRequestUpdate.error = getGoogleUnserviceableAddressError();
          }
          else {
            paymentDataRequestUpdate.newShippingOptionParameters = getGoogleDefaultShippingOptions();
            let selectedShippingOptionId = paymentDataRequestUpdate.newShippingOptionParameters.defaultSelectedOptionId;
            paymentDataRequestUpdate.newTransactionInfo = calculateNewTransactionInfo(selectedShippingOptionId);
          }
        }
        else if (intermediatePaymentData.callbackTrigger == "SHIPPING_OPTION") {
          paymentDataRequestUpdate.newTransactionInfo = calculateNewTransactionInfo(shippingOptionData.id);
        }

        resolve(paymentDataRequestUpdate);
      });
    },

    addGooglePayButton () {
      console.log('addGooglePayButton')

      const button = this.paymentsClient.createButton({
        onClick: () => this.googlePayButtonClick(),
        buttonColor: this.options.buttonColor,
        buttonType: this.options.buttonType
      })
      document.getElementById(this.id).appendChild(button)
    },

    //TODO test (improves performance)
    /**
     * Prefetch payment data to improve performance
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/client#prefetchPaymentData|prefetchPaymentData()}
    */
    prefetchGooglePaymentData() {
      const paymentDataRequest = getGooglePaymentDataRequest();
      // transactionInfo must be set but does not affect cache
      paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'NOT_CURRENTLY_KNOWN',
        currencyCode: 'USD'
      };
      const paymentsClient = getGooglePaymentsClient();
      paymentsClient.prefetchPaymentData(paymentDataRequest);
    },

    /**
     * Process payment data returned by the Google Pay API
     *
     * @param {object} paymentData response from Google Pay API after user approves payment
     * @see {@link https://developers.google.com/pay/api/web/reference/response-objects#PaymentData|PaymentData object reference}
     */
    processPayment(paymentData) {
      // show returned data in developer console for debugging
        console.log(paymentData);
      // @todo pass payment token to your gateway to process payment
      paymentToken = paymentData.paymentMethodData.tokenizationData.token;
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