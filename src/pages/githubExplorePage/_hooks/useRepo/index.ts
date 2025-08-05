import { useEffect, useState } from "react";
import axios from "axios";
import { GithubRepo } from "../../../../types/githubRepo";
import api from "../../../../lib/axios";

export const useFetchRepos = (username: string, expand: boolean) => {
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (!expand) return;
  
      const fetchRepos = async () => {
        try {
          setLoading(true);
          setError(null);

          const res = await api.get<GithubRepo[]>(`/users/${username}/repos`);
          setRepos(res.data);
        } catch (err) {
          
          if (axios.isAxiosError(err)) {
            const message = err.response?.data?.message || "Failed to fetch repositories";
            setError(message);
          } else {
            setError("An unexpected error occurred");
          }

        } finally {
          setLoading(false);
        }
      };
  
      fetchRepos();
    }, [username, expand]);
  
    return { repos, loading, error };
  };