interface Payment {
  payment_method: string
}

interface GooglePay extends Payment {
  payment_method: 'credit_card', // 'credit_card'
  credit_card: {
    installments: Number, // request
    statement_descriptor: string, // request
    payload: {
      type: 'google_pay',
      google_pay: {
        version: 'ECv1',
        data: string, // request
        merchant_identifier: string, //env
        signature: string, // request
        header: { 
          ephemeral_public_key: string, // request
          tag: string // request
        }
      }
    }
  }
}

interface Item {
  amount: Number,
  description: string,
  quantity: Number
}

export type PaymentRequest = {
  currency: string, //env
  customer: { // request
    name: string,
    email: string
  },
  items: Item[] // request
  payments: GooglePay[], // request + env
  metadata?: { // request
    code: string
  },
}