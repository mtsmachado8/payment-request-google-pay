// see @see {@link https://developers.google.com/pay/api/web/reference/object for details
// @todo a merchant ID is available for a production environment after approval by Google
// See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}

const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedCardNetworks: ['MASTERCARD', 'VISA' ], // Other options: 'AMEX','DISCOVER','INTERAC','JCB'
    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    // billingAddressRequired: false, // default false
    // billingAddressParameters: { // default none
    //   format: 'FULL',
    //   phoneNumberRequired: true
    // }
  }
}

const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    // gateway: 'example',
    // gatewayMerchantId: 'exampleGatewayMerchantId'
    gateway: 'mundipagg',
    gatewayMerchantId: 'merch_MXGNWZCz5UxzeQz0',
  }
}

const cardPaymentMethod = {
  baseCardPaymentMethod: baseCardPaymentMethod,
  tokenizationSpecification: tokenizationSpecification
}

// --------------------

const apiConfig = {
  apiVersion: 2,
  apiVersionMinor: 0
}

const transactionInfo = {
  totalPriceStatus: 'FINAL',
  totalPrice: '12.00',
  totalPriceLabel: "Total",
  currencyCode: 'BRL',
  countryCode: 'BR',
  displayItems: [
    {
      label: "Subtotal",
      type: "SUBTOTAL",
      price: "11.00",
    },
    {
      label: "Tax",
      type: "TAX",
      price: "1.00",
    }
  ]
}

const merchantInfo = {
  merchantName: 'Example Merchant',
  merchantId: '0123456789'
}

const paymentDataRequest = {
  ...apiConfig,
  allowedPaymentMethods: [{...baseCardPaymentMethod, tokenizationSpecification}],
  transactionInfo,
  merchantInfo,
  emailRequired: true, // default false
  // callbackIntents = ["PAYMENT_AUTHORIZATION"],
  // shippingAddressRequired: true, // default false
  // shippingAddressParameters : { // default none
  //   allowedCountryCodes: ['BR'],
  //   phoneNumberRequired: true
  // },
  // shippingOptionRequired: true, // default false
  // shippingOptionParameters: {
  //   defaultSelectedOptionId: "shipping-001",
  //   shippingOptions: [
  //     {
  //       "id": "shipping-001",
  //       "label": "$0.00: Free shipping",
  //       "description": "Free Shipping delivered in 5 business days."
  //     },
  //     {
  //       "id": "shipping-002",
  //       "label": "$1.99: Standard shipping",
  //       "description": "Standard shipping delivered in 3 business days."
  //     },
  //     {
  //       "id": "shipping-003",
  //       "label": "$1000: Express shipping",
  //       "description": "Express shipping delivered in 1 business day."
  //     }
  //   ]
  // }
}

const readyToPayRequest = {
  ...apiConfig,
  allowedPaymentMethods: [baseCardPaymentMethod]
}


export default {
  environment: 'TEST',
  buttonColor: 'black',
  buttonType: 'short', // default to long
  baseRequest: apiConfig,
  merchantInfo,
  transactionInfo,
  tokenizationSpecification,
  baseCardPaymentMethod,
  cardPaymentMethod,
  paymentDataRequest: paymentDataRequest,
  readyToPayRequest
}
