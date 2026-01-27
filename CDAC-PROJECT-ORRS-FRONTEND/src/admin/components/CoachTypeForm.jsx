import AdminInput from './AdminInput';

export default function CoachTypeForm({ 
  formData, 
  setFormData, 
  errors = {} 
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <AdminInput
          label="Type Code"
          name="typeCode"
          value={formData.typeCode}
          onChange={(e) => setFormData({...formData, typeCode: e.target.value})}
          error={errors.typeCode}
          required
          maxLength={20}
        />

        <AdminInput
          label="Type Name"
          name="typeName"
          value={formData.typeName}
          onChange={(e) => setFormData({...formData, typeName: e.target.value})}
          error={errors.typeName}
          required
        />
      </div>

      <AdminInput
        label="Description"
        name="description"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        error={errors.description}
      />

      <div className="grid grid-cols-2 gap-6">
        <AdminInput
          label="Total Seats"
          name="totalSeats"
          type="number"
          value={formData.totalSeats}
          onChange={(e) => setFormData({...formData, totalSeats: parseInt(e.target.value) || ''})}
          error={errors.totalSeats}
          required
          min={1}
        />

        <AdminInput
          label="Coach Image URL"
          name="coachImageUrl"
          value={formData.coachImageUrl}
          onChange={(e) => setFormData({...formData, coachImageUrl: e.target.value})}
          error={errors.coachImageUrl}
        />
      </div>
    </div>
  );
}