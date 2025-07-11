export default function PickupForm({ pickupStation, setPickupStation, address, setAddress }) {
  return (
    <div className="mb-8 space-y-4">
      <label className="block font-medium">Pickup Station</label>
      <select
        className="w-full border rounded p-2"
        value={pickupStation}
        onChange={e => setPickupStation(e.target.value)}
      >
        <option value="">-- Select Pickup Station --</option>
        <option value="Nairobi CBD">Nairobi CBD</option>
        <option value="Westlands">Westlands</option>
        <option value="delivery">Home Delivery</option>
      </select>

      {pickupStation === 'delivery' && (
        <div>
          <label className="block font-medium mt-4">Delivery Address</label>
          <textarea
            className="w-full border rounded p-2"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
          />
        </div>
      )}
    </div>
  );
}
