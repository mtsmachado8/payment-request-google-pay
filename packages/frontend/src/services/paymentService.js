import axios from 'axios'

export default async (body) => {
  console.log(body)

  const res = await axios.post(
    'http://localhost:3001/pay',
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )

  console.log(res)
  return res
}

