import axios from "axios";
import { useEffect, useState } from "react";
import { GithubUser } from "../../../../types/githubUser";

export const useSearch = (query: string) => {
    const [users, setUsers] = useState<GithubUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (!query) {
        setUsers([]);
        return;
      }
  
      const delayDebounce = setTimeout(() => {
        const fetchUsers = async () => {
          try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
              `https://api.github.com/search/users?q=${query}&per_page=5`
            );
            setUsers(response.data.items);
          } catch (err) {
            setError("Failed to fetch users");
          } finally {
            setLoading(false);
          }
        };
  
        fetchUsers();
      }, 500);
  
      return () => clearTimeout(delayDebounce);
    }, [query]);
  
    return { users, loading, error };
  };
  