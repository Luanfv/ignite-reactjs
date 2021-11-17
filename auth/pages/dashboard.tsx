import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <h1>Olá, {user?.email}</h1>
  );
}
