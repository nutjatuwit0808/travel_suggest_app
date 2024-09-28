import fetcher from "./fetcher";

// Fetch all trips
export const getTrips = async (keyword) => {
  if (keyword) {
    return await fetcher("/trips?keyword=" + keyword);
  } else {
    return await fetcher("/trips");
  }
};

// Create a new trip
export const createTrip = async (tripData) => {
  return await fetcher("/trips", "POST", tripData);
};

// Delete a trip by ID
export const deleteTrip = async (id) => {
  return await fetcher(`/trips/${id}`, "DELETE");
};
