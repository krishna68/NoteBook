import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Notes from './Notes';
const Home = (props) => {

  return (
    <div className='my-3'>
      <AddNote showAlert={props.showAlert}/>
      <Notes showAlert={props.showAlert} />
    </div>
  )
}

export default Home