"use client"

import { use, useReducer, useState } from "react";
import { Item } from "./types/Item";
import { ListReducer } from "./reducer/listReducer";


const Page = () => {
  const [list, dispatch] = useReducer(ListReducer, []);
  const [addField, setAddField] = useState('');


  const handleAddButton = () => {
    if (addField.trim() === '') return false;

    dispatch({
      type: 'add',
      payload: {
        text: addField.trim()
      }
    });

    setAddField('');
  }

  const handleDoneCheckBox = (id: number) => {
    dispatch ({
      type: 'ToogleDone',
      payload: { id }
    });
  }

  const handleEdit = (id: number) => {
    const item = list.find( it => it.id === id);
    if(!item) return false;

    const newText = window.prompt('Editar Tarefa', item.text);
    if (!newText || newText?.trim() === '') return false;

    dispatch ({
      type: 'editText',
      payload: { id, newText}
    });
  }

  const handleRemove = (id: number) => {
    if (!window.confirm('Realmente deseja excluir?')) return false
      
    dispatch({
      type:'remove',
      payload: { id }
    })
  }
  

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl my-4">Lista de Tarefas</h1>
      <div className="max-w-2xl mx-auto flex rounded-md border border-gray-400 p-4 my-4 bg-gray-800">
        <input type="text"
          className="flex-1 rounded-md border border-gray-400 bg-transparent p-3 text-white outline-none"
         placeholder="Digite um item"
          value={addField}
          onChange={e => setAddField(e.target.value)}
        />
        <button onClick={handleAddButton} className="p-4">Adicionar</button>
      </div>

      <ul className="mx-auto max-w-2xl">
        {list.map(item => (
          <li
            key={item.id}
            className="flex justify-center items-center p-3 my-3 border-b border-gray-700"
          >
            <input
              className="w-4 h-4 mr-4"
              type="checkbox"
              onClick={() => handleDoneCheckBox(item.id)}
            />
            <p className="flex-1 text-lg">{item.text}</p>
            <button onClick={ () => handleEdit(item.id)} className="mx-4 hover:text-gray-500">Editar</button>
            <button onClick={ () => handleRemove(item.id)} className="mx-4 hover:text-gray-500">Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;