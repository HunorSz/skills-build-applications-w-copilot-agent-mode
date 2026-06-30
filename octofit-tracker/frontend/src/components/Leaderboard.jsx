import ResourceSection from './ResourceSection.jsx';

function Leaderboard() {
  const endpointCandidates = [
    `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.github.dev/api/leaderboard/`,
    '/api/leaderboard/',
  ];
  const endpointPath = endpointCandidates[1];

  return (
    <ResourceSection
      title="Leaderboard"
      resourcePath="leaderboard"
      endpointPath={endpointPath}
    />
  );
}

export default Leaderboard;
