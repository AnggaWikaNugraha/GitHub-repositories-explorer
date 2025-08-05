import React from 'react';
import logo from './logo.svg';
import './App.css';
import GithubExplore from './pages/githubExplorePage';

function App() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">GitHub Explorer</h1>
      <GithubExplore />
    </div>
  );
}

export default App;
