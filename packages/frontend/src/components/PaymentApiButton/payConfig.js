// see @see {@link https://developers.google.com/pay/api/web/reference/object for details
// @todo a merchant ID is available for a production environment after approval by Google
// See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}

const paymentMethods = [
  {
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['visa', 'mastercard' ],
      supportedTypes: ['credit','debit']
    }
  },
  {
    supportedMethods: ["https://apple.com/apple-pay"],
    data: {
        version: 3,
        merchantIdentifier: "merchant.com.example",
        merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
        supportedNetworks: ["amex", "discover", "masterCard", "visa"],
        countryCode: "US",
    },
  },
  {
    supportedMethods: ['https://google.com/pay'],
    data: {
      environment: 'TEST',
      // https://pay.google.com/business/console/u/2/home/BCR2DN6TTOA7ZUIR
      merchantId: 'BCR2DN6TTOA7ZUIR',
      apiVersion: 1,
      allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
      paymentMethodTokenizationParameters: {
        tokenizationType: 'PAYMENT_GATEWAY',
        // Check with your payment gateway on the parameters to pass.
        // @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
        parameters: {
          gateway: "mundipagg",
          gatewayMerchantId: "merch_MXGNWZCz5UxzeQz0"
        }
      },
      cardRequirements: {
        allowedCardNetworks: ['MASTERCARD', 'VISA'],
        billingAddressRequired: true,
        billingAddressFormat: 'MIN'
      },
    },
  },
]

const transactionDetails = {
  total: {
    label: 'Total',
    amount: { currency: 'BRL', value: '60.00' }
  },
  displayItems: [
    {
      label: 'Subtotal',
      amount: { currency: 'BRL', value: '50.00' }
    },
    {
      label: 'Standard Shipping',
      amount: { currency: 'BRL', value: '10.00' }
    }
  ],
  shippingOptions: [
    {
      id: 'standard',
      label: 'Standard Shipping',
      amount: { currency: 'BRL', value: '10.00' },
      selected: true
    },
    {
      id: 'free',
      label: 'Free Shipping',
      amount: { currency: 'BRL', value: '0.00' },
      selected: false
    },
  ]
}

const infoReturned = {
  requestShipping: true,
  shippingType: 'shipping',
  requestPayerEmail: true,
  requestPayerPhone: true,
  requestPayerName: true
}

export {
  paymentMethods,
  transactionDetails,
  infoReturned
}
