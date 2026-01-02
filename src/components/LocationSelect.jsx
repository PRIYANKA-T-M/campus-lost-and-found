const LOCATIONS = [
  "Library",
  "Canteen",
  "Hostel",
  "Parking",
  "Classroom Block",
  "Not sure"
];

function LocationSelect({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="">Select Location</option>
      {LOCATIONS.map(loc => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
}

export default LocationSelect;
