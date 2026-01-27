import AdminInput from './AdminInput';
import AdminSelect from './AdminSelect';
import { useTrains } from '../context/TrainContext';
import { useStations } from '../context/StationContext';

export default function TrainRouteForm({ 
  formData, 
  setFormData, 
  errors = {} 
}) {
  const { trains } = useTrains();
  const { stations } = useStations();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <AdminSelect
          label="Train"
          name="trainId"
          value={formData.trainId}
          onChange={(e) => setFormData({...formData, trainId: parseInt(e.target.value)})}
          error={errors.trainId}
          required
          options={[
            { value: '', label: 'Select Train' },
            ...trains.map(train => ({
              value: train.trainId,
              label: `${train.trainNumber} - ${train.trainName}`
            }))
          ]}
        />

        <AdminSelect
          label="Station"
          name="stationId"
          value={formData.stationId}
          onChange={(e) => setFormData({...formData, stationId: parseInt(e.target.value)})}
          error={errors.stationId}
          required
          options={[
            { value: '', label: 'Select Station' },
            ...stations.map(station => ({
              value: station.stationId,
              label: `${station.stationCode} - ${station.stationName}`
            }))
          ]}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <AdminInput
          label="Arrival Time"
          name="arrivalTime"
          type="time"
          value={formData.arrivalTime}
          onChange={(e) => setFormData({...formData, arrivalTime: e.target.value})}
          error={errors.arrivalTime}
        />

        <AdminInput
          label="Departure Time"
          name="departureTime"
          type="time"
          value={formData.departureTime}
          onChange={(e) => setFormData({...formData, departureTime: e.target.value})}
          error={errors.departureTime}
          required
        />

        <AdminInput
          label="Stop Number"
          name="stopNumber"
          type="number"
          value={formData.stopNumber}
          onChange={(e) => setFormData({...formData, stopNumber: parseInt(e.target.value) || ''})}
          error={errors.stopNumber}
          required
          min={1}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <AdminInput
          label="Distance (KM)"
          name="distanceKm"
          type="number"
          value={formData.distanceKm}
          onChange={(e) => setFormData({...formData, distanceKm: parseFloat(e.target.value) || ''})}
          error={errors.distanceKm}
          step="0.1"
        />

        <AdminInput
          label="Platform Number"
          name="platformNumber"
          value={formData.platformNumber}
          onChange={(e) => setFormData({...formData, platformNumber: e.target.value})}
          error={errors.platformNumber}
        />
      </div>
    </div>
  );
}