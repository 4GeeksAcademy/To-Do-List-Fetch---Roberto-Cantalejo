import React, {useState} from 'react'

const ToDoList = () => {

  // Creo un useState para la lista y otro para ir metiendo tareas
  
  const [list, setList] = useState([])
  const [thing, setThing] = useState("")

  // Se crea la función que introduce la tarea en caso de que esta tenga información que no sean espacios en blanco únicamente
  const addToList = (eventInfo) => {
    if (eventInfo.key === 'Enter' && thing.trim() !== '') {
      setList([...list, thing]);
      setThing('')
    }
  }

  // Se crea la función que crea un nuevo array donde el índice que coincide se elimina, para que el botón elimine el índice en el que se encuentra

  const deleteThing = (index) => {
    const newList = list.filter((_, i) => i !== index); 
    setList(newList);
};

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Add something to do</span>
        </div>
        <input type="text" className="form-control" value={thing} onChange={(eventInfo) => setThing(eventInfo.target.value)} onKeyDown={addToList} />
      </div>

      <div className="mt-3 list-container">
      <div className="list-header d-flex justify-content-center px-4 pb-1 pt-1 border-bottom border-primary">
      <h6 id="list-reminder">Please Future Me, don't forget about...</h6>
      </div>
      <ul className="list-group">
        {list.map((task, index) =>
          <li className="list-group-item list-group-item-light small rounded-right-top rounded-0 px-3 py-1">{task}
          <button type="button" class="btn-close" aria-label="Close" onClick={() => deleteThing(index)}></button>
          </li>
        )}
      </ul>
      <div className='list-footer d-flex justify-content-start px-2 pb-1 pt-1'>{list.length} items left</div>
    </div>
  </div>
  );
};

export default ToDoList