import { memo, useState } from "react"
import { AddProductToWishList } from "./AddProductToWishList"

type ProductItemProps = { 
  product: { 
    id: number, 
    price: number, 
    priceFormated: string, 
    title: string, 
  }, 
  onAddToWishList: (id: number) => void
}

function ProductItemComponent({ product, onAddToWishList } : ProductItemProps) {

  const [addingProductToWishList, setAddingProductToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormated}</strong>
      <button 
        onClick={() => setAddingProductToWishList(true)}
      >
        Add to Wish List
      </button>
      {
        addingProductToWishList && 
          <AddProductToWishList 
            onAddToWishList={() => onAddToWishList(product.id)} 
            onRequestClose={() => setAddingProductToWishList(false)}
          />
      }
    </div>
  )

}

// usando a função memo para evitar que o componente 
// sejá renderização novamente sem que nenhuma das suas
// propriedades seja alterada
export const ProductItem = memo(
  ProductItemComponent, 
  // passando uma funçao que permite personalizar 
  // a comparação das propriedades
  (prevProps, nextProps) => { 
    // Usando a função is da classe Object para fazer 
    // uma comparação profunda nos dois objetos (versão 
    // anterior e nova das propriedades)
    return Object.is(prevProps.product, nextProps.product)
  }
)