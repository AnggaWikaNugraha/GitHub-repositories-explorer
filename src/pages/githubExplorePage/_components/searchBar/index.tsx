import React from 'react'

import { useState } from "react";
import { useSearch } from '../../_hooks/useUserSearch';
import UserItem from "../../_components/userItem";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { setInput, setQuery } from '../../../../store/feature/searchSlice';
import { useForm } from 'react-hook-form';

type SearchForm = {
  input: string;
};

const SearchBar = () => {

  const dispatch = useDispatch<AppDispatch>();
  const input = useSelector((state: RootState) => state.search.input);
  const query = useSelector((state: RootState) => state.search.query);
  const { users, loading, error } = useSearch(query);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchForm>();

  const onSubmit = (data: SearchForm) => {
    const trimmed = data.input.trim();
    if (trimmed) {
      dispatch(setInput(trimmed));
      dispatch(setQuery(trimmed));
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 bg-white p-6 w-full max-w-sm mx-auto h-100">

        <p className='text-xs'>Created by @AnggaWIkaNugraha</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter username"
            {...register("input", { required: "Username is required" })}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.input && <p className="text-red-500 text-xs">{errors.input.message}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 w-full"
          >
            Search
          </button>
        </form>


        {loading && <p className="text-sm text-gray-500 mt-2">Loading...</p>}
        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        <div className="mt-4 space-y-2">
          {query.trim() && !loading && !error && users.length === 0 ? (
            <p className="text-sm text-gray-500">No users found.</p>
          ) : (
            users.map((user) => (
              <UserItem key={user.id} username={user.login} />
            ))
          )}
        </div>

      </div>

    </>
  )
}

export default SearchBar