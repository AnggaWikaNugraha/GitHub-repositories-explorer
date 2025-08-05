import axios from "axios";
import { useEffect, useState } from "react";
import { GithubUser } from "../../../../types/githubUser";
import api from "../../../../lib/axios";
import { GitHubUserSearchResponse } from "../../../../types/guthubUserResponse";

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

            const response = await api.get<GitHubUserSearchResponse>(
              `/search/users?q=${query}&per_page=5`
            );
            setUsers(response.data.items);
          } catch (err) {
            if (axios.isAxiosError(err)) {
              const message = err.response?.data?.message || "Failed to fetch users";
              setError(message);
            } else {
              setError("An unexpected error occurred");
            }
            
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
  