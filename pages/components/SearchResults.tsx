import { useMemo } from "react"
import { ProductItem } from "./ProductItem"

type SearchResultsProps = { 
  results: Array<{
    id: number, 
    price: number, 
    title: string
  }>, 
  onAddToWishList: (id: number) => void
}

export function SearchResults({ results, onAddToWishList }: SearchResultsProps) { 

  // O useMemo evita que o totalPrice seja recalculado sempre 
  // que o componente é renderizado novamente. O recalculo 
  // só vai acontecer quando o valor da variavel results for alterado
  const totalPrice = useMemo(() => { 
    return results.reduce((acc, cur ) => { 
      return acc + cur.price
    }, 0)
  }, [results]) 

  return (
    <div>
      <h2>Valor total dos  produtos: {totalPrice}</h2>
      {
        results.map(product => (
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