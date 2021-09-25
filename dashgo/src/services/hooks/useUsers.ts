import { useQuery } from 'react-query';

import { api } from '../api';

type IUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

async function getUsers(): Promise<IUser[]> {
  const response = await api.get('/users');

  const users = response.data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    }
  });

  return users;
}

export function useUsers() {
  return useQuery(
    'users',
    getUsers,
    {
      staleTime: 1000 *  60,
    },
  );
}
