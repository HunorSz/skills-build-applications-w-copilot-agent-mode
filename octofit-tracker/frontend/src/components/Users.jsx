import ResourceSection from './ResourceSection.jsx';

function Users() {
  const endpointPath = '/api/users/';

  return <ResourceSection title="Users" resourcePath="users" endpointPath={endpointPath} />;
}

export default Users;
