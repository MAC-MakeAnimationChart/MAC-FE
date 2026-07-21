import { NavLink, Outlet } from 'react-router-dom';
import './AppShell.css';

const primaryLinks = [
  { to: '/', label: 'Home', icon: '⌂', end: true },
  { to: '/studio', label: 'Studio', icon: '▦' },
  { to: '/pricing', label: 'Pricing', icon: '$' },
];

const workspaceLinks = [
  { to: '/workspace/projects', label: 'Projects', icon: '□' },
  { to: '/workspace/templates', label: 'Templates', icon: '◇' },
  { to: '/workspace/charts', label: 'Chart Gallery', icon: '◌' },
  { to: '/workspace/settings', label: 'Settings', icon: '⚙' },
];

const authLinks = [
  { to: '/login', label: 'Login', icon: '→' },
  { to: '/signup', label: 'Signup', icon: '+' },
];

function SidebarGroup({ title, links }) {
  return (
    <div className="app-sidebar__group">
      <p className="app-sidebar__group-title">{title}</p>
      <div className="app-sidebar__links">
        {links.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `app-sidebar__link${isActive ? ' app-sidebar__link--active' : ''}`
            }
          >
            <span className="app-sidebar__icon" aria-hidden="true">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default function AppShell() {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <NavLink to="/" className="app-sidebar__brand">
          <span className="app-sidebar__brand-mark">M</span>
          <span>
            <strong>MAC</strong>
            <small>visual studio</small>
          </span>
        </NavLink>

        <nav className="app-sidebar__nav" aria-label="Main navigation">
          <SidebarGroup title="Pages" links={primaryLinks} />
          <SidebarGroup title="Workspace" links={workspaceLinks} />
          <SidebarGroup title="Account" links={authLinks} />
        </nav>
      </aside>

      <div className="app-shell__content">
        <Outlet />
      </div>
    </div>
  );
}
