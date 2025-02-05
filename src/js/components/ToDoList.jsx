import React, {useState} from 'react'

const ToDoList = () => {

  const [list, setList] = useState([])
  const [thing, setThing] = useState("")

  const addToList = (eventInfo) => {
    if (eventInfo.key === 'Enter' && thing.trim !== '') {
      setList([...list, thing]);
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

      <div className="mt-3" style={{width:'400px'}}>
      <h4>Please Future Me, don't forget about:</h4>
      <ul class="list-group" style={{width:'400px', display:'flex', justifyContent:'center'}}>
        {list.map((task) =>
          <li class="list-group-item list-group-item-primary small">{task}</li>
        )}
      </ul>
    </div>
  </div>
  );
};

export default ToDoList