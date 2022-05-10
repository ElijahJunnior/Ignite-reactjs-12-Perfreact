import { useMemo } from "react"
import { ProductItem } from "./ProductItem"

type SearchResultsProps = { 
  results: Array<{
    id: number, 
    price: number, 
    title: string
  }>
}

export function SearchResults({ results }: SearchResultsProps) { 

  // const totalPrice = results?.reduce((acc, cur) => {
  //   return acc + cur.price
  // }, 0) || 0

  const totalPrice = useMemo(() => { 
    return results?.reduce((acc, cur) => {
      return acc + cur.price
    }, 0) || 0
  }, [results])  

  return (
    <div>
      <h2> Valor Total {totalPrice}</h2>
      {
        results.map(product => (
          <ProductItem key={product.id} product={product} />
        ))
      }
    </div>
  )

}