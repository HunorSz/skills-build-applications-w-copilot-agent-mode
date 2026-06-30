import ResourceSection from './ResourceSection.jsx';

function Users() {
  const endpointCandidates = [
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.github.dev/api/users/`,
    '/api/users/',
  ];
  const endpointPath = endpointCandidates[1];

  return <ResourceSection title="Users" resourcePath="users" endpointPath={endpointPath} />;
}

export default Users;
