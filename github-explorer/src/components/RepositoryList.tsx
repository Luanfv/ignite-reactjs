import { useState, useEffect } from 'react';
import { RepositoryItem } from './RepositoryItem';

import '../styles/repositories.scss';

interface IRepository {
  name: String;
  description: String;
  html_url: String;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<IRepository[]>([]);

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
            key={String(repository.name)}
            repository={{
              name: repository.name,
              description: repository.description,
              html_url: repository.html_url,
            }}
          />
        ))}
      </ul>
    </section>
  )
}
