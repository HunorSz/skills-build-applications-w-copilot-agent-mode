import ResourceSection from './ResourceSection.jsx';

function Workouts() {
  const endpointPath = '/api/workouts/';

  return (
    <ResourceSection
      title="Workouts"
      resourcePath="workouts"
      endpointPath={endpointPath}
    />
  );
}

export default Workouts;
