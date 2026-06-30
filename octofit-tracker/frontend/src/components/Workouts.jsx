import ResourceSection from './ResourceSection.jsx';

function Workouts() {
  const endpointCandidates = [
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.github.dev/api/workouts/`,
    '/api/workouts/',
  ];
  const endpointPath = endpointCandidates[1];

  return (
    <ResourceSection
      title="Workouts"
      resourcePath="workouts"
      endpointPath={endpointPath}
    />
  );
}

export default Workouts;
