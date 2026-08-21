import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import WorkspaceSidebar from '../components/Workspace/WorkspaceSidebar/WorkspaceSidebar';
import './AppShell.css';

export default function AppShell() {
  const [workspaceView, setWorkspaceView] = useState('myProject');
  const { pathname } = useLocation();
  const showSidebar = pathname !== '/';

  return (
    <div className="app-shell">
      {showSidebar && (
        <WorkspaceSidebar nav={workspaceView} setNavSelect={setWorkspaceView} />
      )}

      <div className="app-shell__content">
        <Outlet context={{ workspaceView, setWorkspaceView }} />
      </div>
    </div>
  );
}
