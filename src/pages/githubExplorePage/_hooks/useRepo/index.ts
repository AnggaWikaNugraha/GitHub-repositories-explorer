import { useEffect, useState } from "react";
import axios from "axios";
import { GithubRepo } from "../../../../types/githubRepo";

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
          const res = await axios.get(
            `https://api.github.com/users/${username}/repos`
          );
          setRepos(res.data);
        } catch (err) {
          setError("Failed to fetch repositories");
        } finally {
          setLoading(false);
        }
      };
  
      fetchRepos();
    }, [username, expand]);
  
    return { repos, loading, error };
  };