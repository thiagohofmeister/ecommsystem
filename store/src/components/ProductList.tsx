import Link from 'next/link'

import { ProductResponse } from '../api/models/Product'
import styles from '../styles/components/productList.module.css'

const ProductList = (props: ProductListProps) => {
  return (
    <div className={styles['product-list']}>
      {props.products.map(product =>
        product.variations.map(variation => (
          <Link href="#">
            <a className={styles['product-list__item']} key={variation.sku}>
              <div className={styles['product-list__image']}>
                <img src={variation.images[0].url} alt="" />
              </div>

              <div className={styles['product-list__infos']}>
                <h2 className={styles['product-list__title']}>{product.title}</h2>

                {variation.price && (
                  <div className={styles['product-list__prices']}>
                    {!!variation.price.sale && (
                      <span className={styles['product-list__previous-price']}>
                        De R$ {variation.price.list.toFixed(2).replace('.', ',')}
                      </span>
                    )}

                    <span className={styles['product-list__current-price']}>
                      Por R${' '}
                      {(variation.price.sale ? variation.price.sale : variation.price.list)
                        .toFixed(2)
                        .replace('.', ',')}
                    </span>
                  </div>
                )}

                <div className={styles['product-list__buy']}>Comprar</div>
              </div>
            </a>
          </Link>
        ))
      )}
    </div>
  )
}

interface ProductListProps {
  products: ProductResponse[]
}

export default ProductList
