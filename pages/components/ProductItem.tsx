import { memo } from "react"

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
  return (
    <div>
      {product.title} - <strong>{product.priceFormated}</strong>
      <button 
        onClick={() => onAddToWishList(product.id)}
      >
        Add to Wish List
      </button>
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