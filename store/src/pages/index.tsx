import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { getProductsList } from '../api'
import Container from '../components/Container'
import Header from '../components/Header'
import ProductList from '../components/ProductList'

export default function Home(props: any) {
  return (
    <div>
      <Head>
        <title>Store</title>
      </Head>

      <Header />
      <Container>
        <ProductList products={props.products} />
      </Container>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { items: products } = await getProductsList()
  return {
    props: {
      products
    }
  }
}
