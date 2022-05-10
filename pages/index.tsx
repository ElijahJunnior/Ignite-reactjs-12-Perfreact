import { FormEvent, useState } from "react"
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

  async function addToWishList(id: number) { 
    console.log(`O produto ID: ${id} foi adicionado a lista de desejos.`)
  }

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