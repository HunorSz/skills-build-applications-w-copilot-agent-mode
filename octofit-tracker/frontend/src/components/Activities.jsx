import ResourceSection from './ResourceSection.jsx';

function Activities() {
  const endpointPath = '/api/activities/';

  return (
    <ResourceSection
      title="Activities"
      resourcePath="activities"
      endpointPath={endpointPath}
    />
  );
}

export default Activities;
