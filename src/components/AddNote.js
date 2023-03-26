import React, { useState,useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote }=context;
    const [note, setnote] = useState({title:"",description:"", tag:""})
    
    const handleClick=(e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
      props.showAlert("Note Added Successfully","success");
      setnote({title:"",description:"", tag:""});
    } 
    const onChange=(e)=>{
      setnote({...note,[e.target.name]:e.target.value});
    }

    return (
    <div><h1>Add your notes</h1>
    <form>
<div className="mb-3">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" id='title' name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={3} required={true}/>
  
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required={true}/>
</div>

<div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
  <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
</div>

<button disabled={note.title.length < 3 || note.description.length <5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
</form>
</div>
  )
}

export default AddNote