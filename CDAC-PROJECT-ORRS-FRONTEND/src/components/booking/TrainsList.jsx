import TrainCard from './TrainCard';
import EmptyTrainsState from './EmptyTrainsState';

/**
 * TrainsList Component
 * Responsibility: Render list of trains or empty state
 */
export default function TrainsList({ trains, onSelectTrain }) {
  if (trains.length === 0) {
    return <EmptyTrainsState />;
  }

  return (
    <div className="space-y-4">
      {trains.map((train) => (
        <TrainCard
          key={train.id}
          train={train}
          onSelectTrain={onSelectTrain}
        />
      ))}
    </div>
  );
}