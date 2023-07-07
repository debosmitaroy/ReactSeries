import { useState } from "react";
import { FaTrashAlt } from 'react-icons/fa'
 

const Content = () => {
    const [name, setName]  = useState('dave')
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([
        {
            id: 1,
            checked: false,
            item: "One half pound bag of Cocoa Covered Almonds Unsalted."
        },
        {
            id: 2,
            checked: false,
            item: "Item 2"
        },
        {
            id: 3,
            checked: false,
            item: "Item 3"
        }
    ])

    const handleNameChange = () => {
        const names = ['bob', 'kevin', 'dave'];
        const int = Math.floor(Math.random()*3);
        setName(names[int]);
      }

    const handleClick = () => {
        setCount(count+1)
        setCount(count+1)
        console.log(count)

    }
    const handleClick2 = (name) => {
        console.log(`${name} clicked`)

    }
    

    return(
        <main>
            {/* <p onDoubleClick={handleClick}>
                Hello {name}!
            </p>
            <button onClick={handleNameChange}>Change Name</button>
            <button onClick={handleClick}>Click It</button> */}

            <ul>
                {items.map(
                    (item) => (
                        <li className="item" key={item.id}>
                            <input type = "checkbox"
                            checked = {item.checked}
                            />
                            <label>{item.item}</label>
                            {/* <button>Delete</button> */}
                            <FaTrashAlt 
                                role="button" 
                                
                            />
                        </li>
                    )
                )}
            </ul>
            

        </main>
    )
}

export default Content