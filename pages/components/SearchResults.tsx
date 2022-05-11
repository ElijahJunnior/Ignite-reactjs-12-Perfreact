import { useMemo } from "react"
import { ProductItem } from "./ProductItem"

type SearchResultsProps = { 
  products: Array<{
    id: number, 
    price: number, 
    priceFormated: string, 
    title: string
  }>,
  totalPrice: number,  
  onAddToWishList: (id: number) => void
}

export function SearchResults({ products, totalPrice, onAddToWishList }: SearchResultsProps) { 

  return (
    <div>
      <h2>Valor total dos  produtos: {totalPrice}</h2>
      {
        products.map(product => (
          <ProductItem 
            key={product.id} 
            product={product} 
            onAddToWishList={onAddToWishList}
          />
        ))
      }
    </div>
  )

}