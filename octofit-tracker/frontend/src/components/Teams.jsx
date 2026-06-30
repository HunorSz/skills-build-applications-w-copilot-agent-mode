import ResourceSection from './ResourceSection.jsx';

function Teams() {
  const endpointPath = '/api/teams/';

  return <ResourceSection title="Teams" resourcePath="teams" endpointPath={endpointPath} />;
}

export default Teams;
