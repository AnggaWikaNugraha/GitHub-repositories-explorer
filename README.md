# 📘 GitHub Repositories Explorer

A simple and responsive React + TypeScript app that lets users search GitHub users and view their public repositories using GitHub's public API.

---

## 🔗 Demo

- 🌐 [Live Demo](https://your-username.github.io/github-repos-explorer/)
- 📁 [Source Code](https://github.com/your-username/github-repos-explorer)

---

## 📋 Features

- 🔍 Search up to 5 GitHub users matching input text  
- 👤 Click a user to expand and view their repositories  
- ⭐ Display repo name, description, and stargazer count  
- ⚡ Debounced search with loading & error states  
- ✅ Accessible keyboard support (Enter key)  
- 🧪 Unit tested with React Testing Library  
- 📱 Mobile responsive design  
- 🚫 Error handling and fallback states  

---

## 🧪 Tech Stack

- **React** (with Hooks)  
- **TypeScript**  
- **Redux Toolkit** (for state management)  
- **React Hook Form** (for form handling)  
- **Axios** (for API calls with interceptors)  
- **Tailwind CSS** (for UI styling)  
- **Jest + React Testing Library** (for testing)  

---

## 🚀 Getting Started

### 🔧 Installation

```bash
git clone https://github.com/your-username/github-repos-explorer.git
cd github-repos-explorer
npm install

## 🚀 Run Dev Server
npm run dev

## 🚀 ENV

VITE_GITHUB_API_URL=https://api.github.com

## project structure
src/
├── _components/         # Shared React components
├── _pages/              # Page views
├── store/               # Redux store and slices
├── lib/axios.ts         # Axios instance with interceptors
├── types/               # TypeScript interfaces

## build
npm run build

## Notes
GitHub Search API is rate-limited for unauthenticated users (60 req/hour).

Responsive mobile UI included.

Proper error handling and loading states implemented.

Repo list loads only when user is expanded (optimized UX).

## 🧪 Tests
✅ useFetchRepos() and useSearch() hooks tested

✅ SearchBar and UserItem components tested

✅ Loading, error, and expand/collapse behavior tested


## ✍️ Author
Created by @AnggaWikaNugraha


