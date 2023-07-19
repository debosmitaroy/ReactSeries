
import Header from './Header'
import Content from './Content';
import Footer from './Footer'
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import { useState, useEffect } from 'react';
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:3500/items';

  // const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  const [newItem, setNewItem] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // localStorage.setItem('shoppinglist', JSON.stringify(items))
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not recieve expected data');
        const listItems = await response.json();
        console.log(listItems)
        setItems(listItems)
        setFetchError(null)

      } catch (err) {
        
        setFetchError(err.message)
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(()=>{
      (async ()=> await fetchItems())();
    },2000)
    // (async ()=> await fetchItems())();
  }, [])
  
  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    // console.log(listItems)
    setItems(listItems)

    const myItem = listItems.filter((item) => item.id===id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON. stringify({checked: myItem[0].checked})
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl,updateOptions);
    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => { return item.id !== id });
    setItems(listItems)

    const reqUrl = `${API_URL}/${id}`
    const deleteOptions = {method: 'DELETE'};
    const result = await apiRequest(reqUrl,deleteOptions);
    if (result) setFetchError(result);
  }

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem]
    setItems(listItems)

    const postOptions = {
      method: 'POST', 
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL,postOptions);
    if (result) setFetchError(result)

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    //ADD NEW ITEM THEN SET THE FORM EMPTY
    addItem(newItem)
    setNewItem('')
  }

  return (
    <div className="App">
      <Header title="Groceries" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{color: 'red'}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          items={items.filter(item => ((item.item).toLowerCase().includes(search.toLowerCase())))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
