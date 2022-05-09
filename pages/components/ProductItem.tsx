import { memo } from "react"

type ProductItemProps = { 
  product: { 
    id: number, 
    price: number, 
    title: string, 
  }
}

function ProductItemComponent({ product } : ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
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