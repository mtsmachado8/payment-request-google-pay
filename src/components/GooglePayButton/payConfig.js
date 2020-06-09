// see @see {@link https://developers.google.com/pay/api/web/reference/object for details
// @todo a merchant ID is available for a production environment after approval by Google
// See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}

const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS']

const allowedCardNetworks = [
  'AMEX',
  'DISCOVER',
  'INTERAC',
  'JCB',
  'MASTERCARD',
  'VISA'
]

const baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks
  }
}

const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    gateway: 'example',
    gatewayMerchantId: 'exampleGatewayMerchantId'
  }
}

const cardPaymentMethod = {
  baseCardPaymentMethod: baseCardPaymentMethod,
  tokenizationSpecification: tokenizationSpecification
}

// --------------------

const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
}

const transactionInfo = {
  totalPriceStatus: 'FINAL',
  totalPrice: '1.00',
  currencyCode: 'USD',
  countryCode: 'US'
}

const merchantInfo = {
  merchantName: 'Example Merchant',
  merchantId: '0123456789'
}

const paymentDataRequest = {
  ...baseRequest,
  allowedPaymentMethods: [{...baseCardPaymentMethod, tokenizationSpecification}],
  transactionInfo,
  merchantInfo
}

const readyToPayRequest = {
  ...baseRequest,
  allowedPaymentMethods: [baseCardPaymentMethod]
}


export default {
  environment: 'TEST',
  buttonColor: 'black',
  baseRequest,
  allowedCardNetworks,
  allowedCardAuthMethods,
  merchantInfo,
  transactionInfo,
  tokenizationSpecification,
  baseCardPaymentMethod,
  cardPaymentMethod,
  paymentDataRequest: paymentDataRequest,
  readyToPayRequest
}
