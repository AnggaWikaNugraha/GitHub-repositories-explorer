import React from 'react'
import { useState } from "react";
import SearchBar from './_components/searchBar';

const GithubExplore = () => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    return (
        <div className="py-9 min-h-screen">
            <SearchBar onUserSelect={(username) => setSelectedUser(username)} />
        </div>
    )
}

export default GithubExplore