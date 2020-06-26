// interface Payment {
//   payment_method: string
// }

// interface GooglePay extends Payment {
//   payment_method: 'credit_card', // 'credit_card'
//   credit_card: {
//     installments: Number, // request
//     statement_descriptor: string, // request
//     payload: {
//       type: 'google_pay',
//       google_pay: {
//         version: 'ECv1',
//         data: string, // request
//         merchant_identifier: string, //env
//         signature: string, // request
//         header: { 
//           ephemeral_public_key: string, // request
//           tag: string // request
//         }
//       }
//     }
//   }
// }

// interface Item {
//   amount: Number,
//   description: string,
//   quantity: Number
// }

// export type PaymentRequest = {
//   currency: string, //env
//   customer: { // request
//     name: string,
//     email: string
//   },
//   items: Item[] // request
//   payments: GooglePay[], // request + env
//   metadata?: { // request
//     code: string
//   },
// }

export function GooglePayRequestData({ 
  currency, 
  customer = {
    name: '',
    email: ''
  }, 
  items = [{
    amount: 1100, // Number without . and ,
    description: '',
    quantity: 1
  }],
  googlePayData = {
    apiVersion: 2,
    apiVersionMinor: 0,
    paymentMethodData: {
      description: '',
      info: { cardNetwork: 'MASTERCARD', cardDetails: '8321' },
      tokenizationData: {
        type: 'PAYMENT_GATEWAY',
        token: `
          signature: \'\',
          protocolVersion: \'\',
          signedMessage: \'\',
          encryptedMessage: \'\',
          ephemeralPublicKey: \'\',
          tag: ephemeralPublicKey: \'\'
        `
      }
    }
  },
  metadata 
}){
  return {
    currency,
    customer,
    items,
    payments: getPayments(getTokenizedData(googlePayData)),
    metadata
  }
}

const getTokenizedData = (googlePayData) => {
  const token = JSON.parse(googlePayData.paymentMethodData.tokenizationData.token)
  const signedMessage = JSON.parse(token.signedMessage)
  delete token.signedMessage
  return {
    ...token,
    ...signedMessage
  }
}

const getPayments = (googlePayTokenizedData) => ([{
  payment_method: 'credit_card',
  credit_card: {
    installments: 1,
    statement_descriptor: 'GYMIFIE',
    payload: {
      type: 'google_pay',
      google_pay: {
        version: 'ECv1',
        data: googlePayTokenizedData.encryptedMessage,
        merchant_identifier: 'merch_MXGNWZCz5UxzeQz0',
        signature: googlePayTokenizedData.signature,
        header: { 
          ephemeral_public_key: googlePayTokenizedData.ephemeralPublicKey,
          tag: googlePayTokenizedData.tag
        }
      }
    }
  }
}])