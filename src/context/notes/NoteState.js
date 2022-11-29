import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async() => {
    // API Call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "auth-token" : localStorage.getItem("token")
    }
  });
  const json = await response.json();
  // console.log(json);
  setnotes(json);
}

  // Add a note
  const Addnote = async(title,description,tag) => {
    // API Call
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "auth-token"  : localStorage.getItem("token")
    },
    body: JSON.stringify({title,description,tag})
  });
  
  const note = await response.json();
  // console.log(note);
  setnotes(notes.concat(note));
}
  

  // Delete a note
  const deleteNote = async(id) => {
    // API Call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "auth-token" : localStorage.getItem("token")
    }
  });

  const json = await response.json();
  console.log(json);

  console.log("Deleting the note with id:"+id);
  const newNotes = notes.filter((note)=>{return note._id!==id});
  setnotes(newNotes);
}
  
  // Update a note
  const editNote = async(id,title,description,tag) => {
    // API Call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "auth-token" : localStorage.getItem("token")
    },
    body: JSON.stringify({title,description,tag})
  });

  const json = await response.json();
  console.log(json);

  let newNotes = JSON.parse(JSON.stringify(notes));
  // logic to edit in client
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if(element._id === id)
    {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
    }
  }
  setnotes(newNotes);
}

  return (
    <NoteContext.Provider value={{notes,Addnote,deleteNote,getNotes,editNote}}>
        {props.children}
    </NoteContext.Provider> 
  )
}

export default NoteState;