import ResourceSection from './ResourceSection.jsx';

function Leaderboard() {
  const endpointPath = '/api/leaderboard/';

  return (
    <ResourceSection
      title="Leaderboard"
      resourcePath="leaderboard"
      endpointPath={endpointPath}
    />
  );
}

export default Leaderboard;
