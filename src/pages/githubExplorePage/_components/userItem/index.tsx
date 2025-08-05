import React from 'react'
import { useState } from "react";
import { useFetchRepos } from "../../_hooks/useRepo";

interface Props {
    username: string;
}

const UserItem: React.FC<Props> = ({ username }) => {

    const [expanded, setExpanded] = useState(false);
    const { repos, loading, error } = useFetchRepos(username, expanded);

    return (
        <div className="border rounded p-2">
            <div
                className="flex justify-between items-center cursor-pointer font-medium"
                onClick={() => setExpanded((prev) => !prev)}
            >
                <span>{username}</span>
                <span>{expanded ? "▴" : "▾"}</span>
            </div>

            {expanded && (
                <div className="mt-2 space-y-2">
                    {loading && <p className="text-sm text-gray-500">Loading repos...</p>}
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {repos.map((repo) => (
                        <div key={repo.id} className="bg-gray-100 p-2 rounded">
                            <div className="flex justify-between font-bold">
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                    {repo.name}
                                </a>
                                <span>⭐ {repo.stargazers_count}</span>
                            </div>
                            <p className="text-sm text-gray-600">{repo.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserItem