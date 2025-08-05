import React from 'react'
import { useState } from "react";
import SearchBar from './_components/searchBar';
// import RepoList from "../components/RepoList/RepoList";

const GithubExplore = () => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    return (
        <div className="space-y-6">
            <SearchBar onUserSelect={(username) => setSelectedUser(username)} />
            {/* {selectedUser && <RepoList username={selectedUser} />} */}
        </div>
    )
}

export default GithubExplore