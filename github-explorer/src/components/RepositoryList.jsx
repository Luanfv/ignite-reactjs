import { useState, useEffect } from 'react';
import { RepositoryItem } from './RepositoryItem';

import '../styles/repositories.scss';

export function RepositoryList() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/Luanfv/repos')
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista</h1>

      <ul>
        {repositories.map((repository) => (
          <RepositoryItem
            key={repository.id}
            repository={{
              name: repository.name,
              description: repository.description,
              link: repository.html_url,
            }}
          />
        ))}
      </ul>
    </section>
  )
}
