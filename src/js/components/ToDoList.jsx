import React, {useState, useEffect} from 'react'

const ToDoList = () => {

  
  // Creo un useState para la lista y otro para ir metiendo tareas
  
  const [list, setList] = useState([])
  const [thing, setThing] = useState("")
  
  // Voy a traer la información de la Todo de la API.

  const getList = async () => {
    const response = await fetch('https://playground.4geeks.com/todo/users/robercantalejo');
    const data = await response.json();
    setList(data.todos)
  }
 
  useEffect(() => {
    getList(); // Aquí estoy llamando a la lista desde la API una sola vez, porque en las dependencias no he puesto nada.
  }, [])
  
  // Hago una constante para POSTear tareas.

  const postThing = async (newThing) => { // Le pasamos un parámetro que va a ser la tarea que hemos añadido.
    const tarea = { label: newThing, is_done: false }; // Aquí el parámetro pasa a ser el label de la tarea que estamos pasando.
    const response = await fetch('https://playground.4geeks.com/todo/todos/robercantalejo', {
      method: 'POST', // El método que estoy usando es POST.
      body: JSON.stringify(tarea), // Convertimos el json en un string donde mandamos la variable "tarea" creada antes, que va a ser lo que hayamos añadido.
      headers: {
        'Content-Type': 'application/json' // Estamos haciendo una HTTP request y de todos los tipos, estamos pasando un json.
      }
    });
    getList()
  }

    // Hago una constante para DELETEar tareas.

    const deleteThing = async (id) => { // Le pasamos un parámetro que va a ser la tarea que hemos añadido.
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE"
      });
      getList();
    }

  // Se crea la función que introduce la tarea en caso de que esta tenga información que no sean espacios en blanco únicamente.
  const addToList = (eventInfo) => {
    if (eventInfo.key === 'Enter' && thing.trim() !== '') {
      postThing(thing)
      setThing('')
    }
  }

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
        <li key={index} className="list-group-item list-group-item-light small rounded-right-top rounded-0 px-3 py-1">{task.label}
        <button type="button" class="btn-close" aria-label="Close" onClick={() => deleteThing(task.id)}></button>
        </li>
      )}
    </ul>
    <div className='list-footer d-flex justify-content-start px-2 pb-1 pt-1'>{list.length} items left</div>
  </div>
</div>
);
};

export default ToDoList