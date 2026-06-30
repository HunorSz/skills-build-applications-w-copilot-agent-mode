import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { apiBaseUrl, getCodespaceNotice } from './lib/api.js';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const codespaceNotice = getCodespaceNotice();

  return (
    <div className="container py-4 py-lg-5">
      <header className="mb-4">
        <h1 className="display-6 mb-2">Octofit Tracker API Console</h1>
        <p className="text-secondary mb-2">Presentation tier powered by React Router and Vite env variables.</p>
        <p className="small text-secondary mb-0">Resolved API base URL: {apiBaseUrl}</p>
        {codespaceNotice && (
          <div className="alert alert-warning mt-3 mb-0" role="alert">
            {codespaceNotice}
          </div>
        )}
      </header>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4" aria-label="Resource navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link border'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
