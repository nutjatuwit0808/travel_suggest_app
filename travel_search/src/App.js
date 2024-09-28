import "./App.css";
import { useEffect, useState } from "react";
import { getTrips } from "./services/tripService";
import TripItem from "./components/trips/TripItem";
import { useLocation } from "react-router-dom";
import classes from "./App.module.css";

function App() {
  const location = useLocation();
  const [trips, setTrips] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchTrips = async (keyword) => {
    try {
      const tripsData = await getTrips(keyword);
      setTrips(tripsData);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setTrips([]);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryKeyword = searchParams.get("keyword") || "";
    setKeyword(queryKeyword);
    fetchTrips(queryKeyword);
  }, [location.search]);

  const handleChangeSearch = (event) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);
    replaceURLWithoutReRender(newKeyword);
    fetchTrips(newKeyword);
  };

  const replaceURLWithoutReRender = (keyword) => {
    let replaceUrl = keyword ? `?keyword=${keyword}` : "/";
    window.history.replaceState(null, "", replaceUrl);
  };

  return (
    <div className={classes.appContainer}>
      <header className={classes.tripHeader}>
        <h1>เที่ยวไหนดี</h1>
        <input
          type="text"
          id="trip-search"
          name="trip-search"
          className={classes.searchTrip}
          onChange={handleChangeSearch}
          value={keyword}
          placeholder="หาที่เที่ยวแล้วไปกัน..."
        />
      </header>
      <section className={classes.tripBody}>
        {trips.length > 0 ? (
          trips.map((item) => (
            <TripItem
              key={item.eid}
              title={item.title}
              description={item.description}
              eid={item.eid}
              url={item.url}
              photos={item.photos}
              tags={item.tags}
            />
          ))
        ) : (
          <p>ไม่เจอข้อมูลที่ค้นหา</p>
        )}
      </section>
    </div>
  );
}

export default App;
