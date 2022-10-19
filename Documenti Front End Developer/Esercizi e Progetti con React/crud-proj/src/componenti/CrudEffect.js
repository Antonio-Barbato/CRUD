import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const CrudEffect = () => {
    const [data, setData] = useState([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [updated, setUpdated] = useState({id:'',name:'' })


    useEffect(() => {
       loadData()
    },[])

    const loadData = async () => {
        const response = await axios.get('http://localhost:4000/contacts')
        console.log(response.data);
        setData(response.data)
    }

    const addUser = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/contacts', {
            id, name
        }).then(() => {
            setId(''); setName('')
        }).catch((err) => {
            console.log(err);
        })
        
        setTimeout(() => {
        loadData()
       },500) 
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost:4000/contacts/${id}`)
        setTimeout(() => {
            loadData()
           },500)
    }

    const updateUser = () => {
        console.log(updated.id, updated.name);
        axios.put(`http://localhost:4000/contacts/${updated.id}`, {
            id: updated.id,
            name: updated.name
        }).then((response) => {
            console.log(response);
        }).catch((e) => {console.log(e);})

        setTimeout(() => {
            loadData()
           },500)
    }


    

  return (
    <div className='App'>
        <h2>Crude Project</h2>
        <input
        placeholder='Enter id'
        value={id}
        onChange={e => setId(e.target.value)}
        />
        <input
        placeholder='Enter name'
        value={name}
        onChange={e => setName(e.target.value)}
        />
        <button onClick={addUser}>Add</button>
        {
            data.map((user, index) => {
                return (
                    <div key={index}>
                        {user.id}-{user.name} <button onClick={() => {deleteUser(user.id)}}>delete</button>
                        <input
                        type='text'
                        placeholder='enter updated id'
                        onChange={e => setUpdated({...updated, id:e.target.value})}
                        />
                        <input
                        type='text'
                        placeholder='enter updated name'
                        onChange={e => setUpdated({...updated, name:e.target.value})}
                        />
                        <button onClick={updateUser}>update</button>
                    </div>
                )
            })
        }
    </div>
  )
}
