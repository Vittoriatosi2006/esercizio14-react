import { useState } from "react";

type User = {
  name: string;
  avatar_url: string;
  bio: string;
};

export function useGithubUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchUser(username: string) {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) throw new Error(response.statusText);

      const responseJson = await response.json();

      setUser(responseJson);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }

    //fetch(`https://api.github.com/users/${username}`)
    // .then((response) => {
    //  if (!response.ok) throw new Error(response.statusText);
    //  return response.json();
    // })
    // .then((json) => setUser(json))
    // .catch((err) => setError(err.message))
    // .finally(() => setLoading(false));
  }

  return { user, loading, error, fetchUser };
}
