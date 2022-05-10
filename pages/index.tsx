import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "./components/SearchResults";

type Product = { 
  id: number, 
  price: number, 
  title: string
}

export default function Home() {
  
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  async function submitHandle(event: FormEvent) {
    
    event.preventDefault();

    if(!search.trim()) {
      return;
    }

    const response = await fetch(
      `http://localhost:3333/products?q=${search}`
    );

    const data = await response.json();

    setResults(data);

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
          results={results} 
          onAddToWishList={addToWishList}
        />
    </div>
  )

}