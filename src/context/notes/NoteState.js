import React, { useState } from "react";

import noteContext from "./noteContext";
const NoteState=(props)=>{
  const host="http://localhost:5000"
    const notesInitial=[
      ]
      const [notes, setnotes] = useState(notesInitial);
    
      //fetch all notes
      const fetchNotes=async ()=>{
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
         method: 'GET', // *GET, POST, PUT, DELETE, etc.
         
         headers: {
           'Content-Type': 'application/json',
           'auth-token':localStorage.getItem('token')
         }
         //  header
       });
       const jsonNotes=await response.json();
      //  console.log(jsonNotes)
       setnotes(jsonNotes);
     }

      //Add a note
      const addNote=async (title,description,tag)=>{
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
        });

        
        const note=await response.json();
        console.log(note); 
        setnotes(notes.concat(note));
        // console.log("Adding a new note");
     
      }

      //Update note
      const editNote=async (id,title,description,tag)=>{
        //todo:set api calls
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
        });
        const json=await response.json();
        console.log(json);
        //logic to edit in client  
        let newNotes=JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }
        setnotes(newNotes);
      }

      //delete note
      const deleteNote=async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          },
         // body data type must match "Content-Type" header
        });
        const json=await response.json();
        
        //logic in frontend
        const newNotes=notes.filter((note)=>{
          return note._id!==id
        })
        setnotes(newNotes);
      }

      return(
        <noteContext.Provider value={{notes,setnotes,fetchNotes,addNote,editNote,deleteNote}}>
            {props.children}
        </noteContext.Provider>
      )
}
export default NoteState;