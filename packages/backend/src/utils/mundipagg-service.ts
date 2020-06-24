import axios from 'axios'
import { PaymentRequest } from '../model/payment'

export default async (data: PaymentRequest) => {  
  const base64MerchantId = Buffer.from('sk_test_9GNpgrhQoI71dL2v:').toString('base64')

  return axios.post(
    'https://api.mundipagg.com/core/v1/orders',
    data,
    {
      headers: {
      'Authorization': 'Basic ' + base64MerchantId,
      'Content-Type': 'application/json',
      }
    }
  )
}

