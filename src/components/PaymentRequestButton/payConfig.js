// see @see {@link https://developers.google.com/pay/api/web/reference/object for details
// @todo a merchant ID is available for a production environment after approval by Google
// See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}

const paymentMethods = [
  {
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['visa', 'mastercard' ],
    }
  },
  {
    supportedMethods: ['https://google.com/pay'],
    data: {
      merchantID: '12345',
      // ...
    }
  },
]

const transactionDetails = {
  total: {
    label: 'Total',
    amount: { currency: 'BRL', value: '50.00' }
  },
  displayItems: [
    {
      label: 'Subtotal',
      amount: { currency: 'BRL', value: '50.00' }
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
      id: 'express',
      label: 'Express Shipping',
      amount: { currency: 'BRL', value: '10.00' },
    },
  ]
}

const infoReturned = {
  shippingType: 'shipping',
  requestShipping: true,
  requestPayerEmail: true,
  requestPayerPhone: true,
  requestPayerName: true
}

export {
  paymentMethods,
  transactionDetails,
  infoReturned
}
