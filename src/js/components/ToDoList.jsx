import React, {useState, useEffect} from 'react'

const ToDoList = () => {

  // Creo un useState para la lista, otro para ir metiendo tareas y otro para que la persona cree el usuario en la API.
  
  const [list, setList] = useState([])
  const [task, setTask] = useState("")
  const [user, setUser] = useState("")
  const [logged, setLogged] = useState()
  
  // Hago una función para recoger el nombre del user y crearlo en la API

  const getUser = async (e) => {
    const currentUser = e.target.value.trim();
    if (e.key === 'Enter' && currentUser !== '') {
      await fetch(`https://playground.4geeks.com/todo/users/${currentUser}`, {
        method: 'POST'
      });
      setUser(currentUser);
      e.target.value = "";
    }
  }

  // Voy a traer la información de la Todo de la API.

  const getList = async () => {
    const response = await fetch(`https://playground.4geeks.com/todo/users/${user}`);
    const data = await response.json();
    if (data.todos) {
      setList(data.todos)
    } else {
      setList([])
    }
  }
 
  useEffect(() => {
    if (user) {
    getList(); // Aquí estoy llamando a la lista desde la API cuando cambia el user.
    setLogged(true); // Indica que se está loggeado.
    } else {
      setList([]);
      setLogged(false);
    }
  }, [user])
  
  // Hago una constante para añadir nuevas tareas.

  const postTask = async (newTask) => { // Le pasamos un parámetro que va a ser la tarea que hemos añadido.
    const tarea = { label: newTask, is_done: false }; // Aquí el parámetro pasa a ser el label de la tarea que estamos pasando y el estado de que no está hecha.
    const response = await fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
      method: 'POST', // El método que estoy usando es POST.
      body: JSON.stringify(tarea), // Convertimos el json en un string donde mandamos la variable "tarea" creada antes, que va a ser lo que hayamos añadido.
      headers: {
        'Content-Type': 'application/json' // Estamos haciendo una HTTP request y de todos los tipos, estamos pasando un json.
      }
    });
    getList()
  }

    // Hago una constante para DELETEar tareas.

    const deleteTask = async (id) => { // Le pasamos un parámetro que va a ser la tarea que hemos añadido.
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE"
      });
      getList();
    }

  // Se crea la función que introduce la tarea en caso de que esta tenga información que no sean espacios en blanco únicamente.
  const addToList = (e) => {
    if (e.key === 'Enter' && task.trim() !== '') {
      postTask(task)
      setTask('')
    }
  }

return (
  <div className="d-flex flex-column justify-content-center align-items-center vh-100">
  <div className="input-group">
  <div className="input-group-prepend">
    <span className="input-group-text" id="">Insert user name</span>
  </div>
  <input type="text" className="form-control" onKeyDown={getUser} placeholder= {logged ? "Enter another user name if you want to change" : "Enter the user name"}/>
</div>
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">Add something to do</span>
      </div>
      <input type="text" className="form-control" value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={addToList} 
      placeholder={logged ? "Enter a task you want to remember" : "Calm down. Introduce yourself first"} disabled={!logged}/>
    </div>

    <div className="mt-3 list-container">
    <div className="list-header d-flex justify-content-center px-4 pb-1 pt-1 border-bottom border-primary">
    <h6 id="list-reminder">{logged ? <>Remember, <span id='known'>{user}</span>, you have to...</>: <>We don't know yet, <span id='anon'>Anonymous</span></>}</h6>
    </div>
    <ul className="list-group">
      {list.map((task) =>
        <li key={task.id} className="list-group-item list-group-item-light small rounded-right-top rounded-0 px-3 py-1">{task.label}
        <button type="button" className="btn-close" aria-label="Close" onClick={() => deleteTask(task.id)}></button>
        </li>
      )}
    </ul>
    <div className='list-footer d-flex justify-content-start px-2 pb-1 pt-1'>{list.length} tasks to do</div>
  </div>
</div>
);
};

export default ToDoList