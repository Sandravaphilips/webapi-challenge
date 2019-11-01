import React, {useEffect, useState} from 'react';
import {Link, Route} from 'react-router-dom';
import axios from "axios";
import './App.css';
import styled from "styled-components";

const AppStyle = styled.div`

`

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/projects')
    .then(res => {
      setProjects(res.data)
    })
    .catch(err => console.log(err))
  }, []);

  return (
    <div className="App">
      <h1>Todo Projects</h1>

      <div>
        {
          projects.map(project =>
            <div key={project.id} >
              <p>{project.name}</p>
              <p>{project.description}</p>
              <Link to={`/${project.id}/actions`} >
                <button>View actions</button>
              </Link>
            </div>
          )
        }
      </div>

      <Route path="/:id/actions" component={ActionsComponent} />

    </div>
  );
}

function ActionsComponent(props) {
  const [actions, setActions] = useState([]);

  const {id} = props.match.params

  useEffect(() => {
    axios.get(`http://localhost:5000/projects/${id}/actions`)
    .then(res => {
      setActions(res.data)
    })
    .catch(err => console.log(err))
  })

  return (
    <div>
      {
        actions.map(action => 
          <div key={action.id} >
            <p>{action.description}</p>
            <p>{action.notes}</p>
          </div>
        )
      }
    </div>
  )

}

export default App;
