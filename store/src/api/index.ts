import axios from 'axios'

const instance = () => {
  console.log(process.env.NEXT_APP_API_URL)
  return axios.create({
    baseURL: process.env.NEXT_APP_API_URL,
    headers: {
      'x-store': process.env.NEXT_APP_STORE_ID!
    }
  })
}

const getProductsList = async () => {
  return (await instance().get(`/product`)).data
}

export { getProductsList }
