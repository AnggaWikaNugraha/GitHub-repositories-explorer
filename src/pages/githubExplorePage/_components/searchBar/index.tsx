import React from 'react'

import { useState } from "react";
import { useSearch } from '../../_hooks/useUserSearch';
import UserItem from "../../_components/userItem";

interface SearchBarProps {
  onUserSelect: (username: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onUserSelect }) => {

  const [input, setInput] = useState(""); // input dari user
  const [query, setQuery] = useState(""); // trigger untuk useSearch
  const { users, loading, error } = useSearch(query);

  const handleSearch = () => {
    if (input.trim()) setQuery(input.trim());
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <div className="flex flex-col gap-4 bg-white p-6 w-full max-w-sm mx-auto h-100">

        <p className='text-xs'>Created by @AnggaWIkaNugraha</p>
        <input
          type="text"
          placeholder="Enter username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 w-full"
        >
          Search
        </button>

        {loading && <p className="text-sm text-gray-500 mt-2">Loading...</p>}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        <div className="mt-4 space-y-2">
          {users.map((user) => (
            <UserItem key={user.id} username={user.login} />
          ))}
        </div>
        
      </div>

    </>
  )
}

export default SearchBar