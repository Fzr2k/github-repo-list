import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const [githubUsername, setGithubUsername] = useState('');
  const [githubRepositories, setGithubRepositories] = useState([]);
  const [showGithubRepositories, setShowGithubRepositories] = useState(false);

  const getRepositoryList = async () => {
    fetch(`https://api.github.com/users/${githubUsername}/repos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Incorrect Github username. Please re-check');
        }
        return response.json();
      })
      .then((data) => {
        setGithubRepositories(data);
        setShowGithubRepositories(true);
      })
      .catch((error) => {
        console.error(error);
        setGithubRepositories([]);
        setShowGithubRepositories(false);
        Swal.fire('Error', error.message, 'error');
      });
  };

  const submitFormOnEnterKey = (event) => {
    if (event.key === 'Enter') {
      getRepositoryList();
    }
  };

  return (
    <div className="container">
      <h1>GitHub Repository Fetcher</h1>
      <div className="input-container">
        <input
          className='input-field'
          type="text"
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
          onKeyDown={submitFormOnEnterKey}
        />
        <button className="fetch-button" onClick={getRepositoryList}>Fetch Repositories</button>
      </div>
      {showGithubRepositories && (
        <>
          <ul className="repository-list repository-container">
            {githubRepositories.map((repo) => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
        </>
        )}
    </div>
  );
}

export default App;
