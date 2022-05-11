import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "./components/SearchResults";

type Product = { 
  id: number, 
  price: number, 
  priceFormated: string, 
  title: string
}

type Results = { 
  products: Product[], 
  totalPrice: number
}

export default function Home() {
  
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    products: [], 
    totalPrice: 0}
  );

  async function submitHandle(event: FormEvent) {
    
    event.preventDefault();

    if(!search.trim()) {
      return;
    }

    const response = await fetch(
      `http://localhost:3333/products?q=${search}`
    );

    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency', 
      currency: 'BRL'
    })

    const products = data.map(product => {
      return { 
        id: product.id, 
        price: product.price, 
        title: product.title, 
        priceFormated: formatter.format(product.price)
      }
    })

    const totalPrice = data.reduce((acc, cur ) => { 
      return acc + cur.price
    }, 0) 

    setResults({totalPrice, products});

  }

  const addToWishList = useCallback(
    // função que vai ser sempre armazenada no mesmo enderço de memoria
    async (id: number) => { 
      console.log(`O produto ID: ${id} foi adicionado a lista de desejos.`)
    }, 
    // lista de dependencias, ou seja, variaveis do componente pai 
    // que vão ser usadas dentro de função tratada pelo useCallback
    []
  ) 

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={submitHandle}>
        <input
          type="text" 
          value={search} 
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit">
          Buscar
        </button>
      </form>
      <SearchResults 
        products={results.products} 
        totalPrice={results.totalPrice}
        onAddToWishList={addToWishList}
      />
    </div>
  )

}