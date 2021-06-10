interface IRepositoryItemProps {
  repository: {
    name: String;
    description: String;
    html_url: String;
  }
}

export function RepositoryItem(props: IRepositoryItemProps) {
  const { name, description, html_url } = props.repository;

  return (
    <li>
      <strong>{name}</strong>
      <p>{description}</p>

      <a href={String(html_url)} target="_blank">Acessar repositório</a>
    </li>
  );
}
