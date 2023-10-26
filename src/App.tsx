import { useState } from 'react'
import './App.css'

type ItemId = `${string}-${string}-${string}-${string}-${string}`

interface Item {
  id: ItemId
  timestamp: number
  text: string
}

// const initial_items: Item[] = [
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: 'VideoJuegos'
//   },
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: 'Libros'
//   }
// ] 

function App() {
  const [items, setItems] = useState<Item[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const {elements} = event.currentTarget
    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) return
    
    const newItem : Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now()
    }

    setItems((prevState) => {
      return [...prevState, newItem]
    })
    
    input.value = ''
  }

  const createHandleRemove = (id: ItemId) => () => {    
      setItems(prevItems => {
        return prevItems.filter(currentItem => currentItem.id != id)
      })
    
  }
  return (
    <main>
      <aside>
        <h1>Prueba tecnica react</h1>
        <h2>Añadir y eliminar elementos de una lista</h2>

        <form onSubmit={handleSubmit} aria-label='añadir elementos a la lista'>
          <label >
            Elemento a introducir:
            <input 
              type="text"
              name="item"
              required
              placeholder='VideoJuegos'
             />
          </label>
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>

      <section>
        <h2>Lista de elementos</h2>
        <ul>
          {
            items.map(item => {
              return (
                <li key={item.id}>
                  {item.text}
                  <button onClick={createHandleRemove(item.id)}>
                    Eliminar elemento
                  </button>
                </li>
              )              
            })
          }
        </ul>
      </section>
    </main>
  )
}

export default App
