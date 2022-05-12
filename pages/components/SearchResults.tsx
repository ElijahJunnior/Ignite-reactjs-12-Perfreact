import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from 'react-virtualized';

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

  const rowRenderer: ListRowRenderer = ({index, key, style}) => { 
    return(
      <div key={key} style={style} >
        <ProductItem         
          product={products[index]} 
          onAddToWishList={onAddToWishList}
        />
      </div>
    )
  }

  return (
    <div>
      {/* componente responsável por exibir os itens e  */}
			{/*  decider o que fica visível na tela e o que fica escondido  */}
      <List
				// atura do componente em pixels
        height={300} 
        // largura do componente em pixels 
        width={900} 
        // altura de cada linha da lista 
        rowHeight={30}
        // quantas linhas não visíveis vão ser renderizadas 
				// para ajudar na performance no momento da rolagem da página 
        overscanRowCount={5}
				// quantidade de itens na lista 
        rowCount={products.length}
				// função que faz a renderização dos itens 
        rowRenderer={rowRenderer}
      />
      <h2>Valor total dos  produtos: {totalPrice}</h2>
      {
        // products.map(product => (
        //   <ProductItem 
        //     key={product.id} 
        //     product={product} 
        //     onAddToWishList={onAddToWishList}
        //   />
        // ))
      }
    </div>
  )

}