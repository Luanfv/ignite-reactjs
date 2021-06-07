import { RepositoryItem } from "./RepositoryItem";

export function RepositoryList() {
  return (
    <section class="repository-list">
      <h1>Lista</h1>

      <ul>
        <RepositoryItem
          repository={{
            name: 'teste',
            description: 'lorem ipsum',
            link: 'https://github.com',
          }}
        />

        <RepositoryItem
          repository={{
            name: 'batata',
            description: 'lorem ipsum',
            link: 'https://github.com',
          }}
        />

        <RepositoryItem
          repository={{
            name: 'feijão',
            description: 'lorem ipsum',
            link: 'https://github.com',
          }}
        />
      </ul>
    </section>
  )
}
