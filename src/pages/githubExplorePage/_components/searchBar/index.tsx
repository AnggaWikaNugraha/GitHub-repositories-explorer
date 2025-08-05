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

  const handleKeyDown = (e : any) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Exampleuser"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500 mt-2">Loading...</p>}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

      <div className="mt-4 space-y-2">
        {users.map((user) => (
          <UserItem key={user.id} username={user.login} />
        ))}
      </div>
    </div>
  )
}

export default SearchBar