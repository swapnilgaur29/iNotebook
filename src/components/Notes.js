import React, { useContext, useEffect ,useState,useRef} from 'react'
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Notesitem from './Notesitem';
import {useNavigate} from "react-router-dom"

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setnote] = useState({id:"",title: "", description: "", tag: "" });
    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token"))
        {
            getNotes();
        }
        else
        {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);
    
    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) =>{
        ref.current.click();
        setnote({id:currentNote._id,title: currentNote.title, description: currentNote.description, tag: currentNote.tag })
    }

    const handleClick = (e) => {
        editNote(note.id,note.title, note.description, note.tag);
        refClose.current.click();
        props.showAlert("Update Successful","success")
    }

    const OnChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Addnote showAlert = {props.showAlert}/>

            <button ref = {ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={OnChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label" >Description</label>
                                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={OnChange} />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label" >Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={OnChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className='container'>
                {notes.length === 0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Notesitem key={note._id} updateNote ={updateNote} showAlert = {props.showAlert} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes