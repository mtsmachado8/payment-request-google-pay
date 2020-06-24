import 'dotenv/config'
import express, { response } from 'express'
import mundipaggPay from './utils/mundipagg-service'
import { PaymentRequest } from './model/payment'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/pay', async (req, res) => {
  const body: PaymentRequest = req.body

  console.log(req.body)
  mundipaggPay(body)
    .then(response => {
      console.log('successfully responded: ', response.data)
      res.status(response.status).json({ payed: response.data })
    })
    .catch(err => {
      res.status(err.response.status).json({ error: err.response.data })
    })
})

app.listen(3001, () => {
  console.log('listening on 3001')
})