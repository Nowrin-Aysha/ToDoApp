import './App.css';
import { useState } from 'react';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState('');

  const deleteToDo = (id) => {
    setToDos(toDos.filter(toDo => toDo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditMode(id);
    setEditText(text);
  };

  const saveEdit = () => {
    setToDos(toDos.map(item => {
      if (item.id === editMode) {
        return { ...item, text: editText };
      }
      return item;
    }));
    setEditMode(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditMode(null);
    setEditText('');
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>To Do List!</h1>
      </div>
      <div className="subHeading">
        <br />
      </div>
      <div className="input">
        <input 
          value={toDo} 
          onChange={(e) => setToDo(e.target.value)} 
          type="text" 
          placeholder="🖊️ Add item..." 
        />
        <i 
          onClick={() => {
            if (toDo.trim() !== "") {
              setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
              setToDo('');
            }
          }} 
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input 
                  onChange={(e) => {
                    setToDos(toDos.map(item => {
                      if (item.id === obj.id) {
                        item.status = e.target.checked;
                      }
                      return item;
                    }));
                  }}  
                  checked={obj.status} 
                  type="checkbox" 
                  name="" 
                  id="" 
                />
                {editMode === obj.id ? (
                  <div>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <p onClick={() => startEdit(obj.id, obj.text)}>{obj.text}</p>
                )}
              </div>
              <div className="right">
                <i 
                  className="fas fa-times" 
                  onClick={() => deleteToDo(obj.id)}
                ></i>
              </div>
            </div>
          );
        })}
        <br></br>
        <div className="completedTasks">
          <h2>Completed Tasks:</h2>
          {toDos.map((obj) => {
            if (obj.status) {
              return (<h1 key={obj.id}>{obj.text}</h1>);
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
