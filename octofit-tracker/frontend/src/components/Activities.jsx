import ResourceSection from './ResourceSection.jsx';

function Activities() {
  const endpointCandidates = [
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`,
    '/api/activities/',
  ];
  const endpointPath = endpointCandidates[1];

  return (
    <ResourceSection
      title="Activities"
      resourcePath="activities"
      endpointPath={endpointPath}
    />
  );
}

export default Activities;
