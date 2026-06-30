import ResourceSection from './ResourceSection.jsx';

function Teams() {
  const endpointCandidates = [
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.github.dev/api/teams/`,
    '/api/teams/',
  ];
  const endpointPath = endpointCandidates[1];

  return <ResourceSection title="Teams" resourcePath="teams" endpointPath={endpointPath} />;
}

export default Teams;
