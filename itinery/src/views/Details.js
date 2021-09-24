import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

const Details = (props) => {
    const [itineray, setItineray] = useState([]);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (needsUpdate == true) {
            setNeedsUpdate(false);
        };
        axios
            .get(`http://localhost:8000/api/itinerays/${id}`, { withCredentials: true, })
            .then((res) => {
                setItineray(res.data);
                console.log(res.data);

            })
            .catch((err) => {
                console.log(err.response);
            })
    }, [id]);


    const handleDelete = (delId) => {
        axios
            .delete("http://localhost:8000/api/itinerays/" + delId, {
                withCredentials: true,
            })
            .then((res) => {
                // const filteredItinerays = itineray.filter((itin) => {
                //     return itin._id !== delId;
                // });

                // setItineray(filteredItinerays);
                setNeedsUpdate(true);
                history.push("/Departments/Contacts", "section1");
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    if (itineray === null) {
        return "Loading...";
    }

    return (
        <div style={{
            padding: 15,
            borderRadius: 10,
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            width: "60%",
            margin: "0 auto", //meaning???
            marginBottom: 20,
        }}>
            <div><Link to="/Departments/Contacts">Home</Link></div>
            {/* u use _id when it the id comes from the database object NOT the url :id and regular id is ONLY with urls */}
            <div style={{ padding: 15 }}>
                <h2>{itineray.lastName} {itineray.firstName}</h2>
                <p>Department: {itineray.department}</p>
                <p>Title: {itineray.title}</p>
                <p>Email: {itineray.email}</p>
                <p>Phone: {itineray.phone}</p>
            </div>

            <div>
                <Link to={`/ Departments / Contacts / ${itineray._id} / edit`}>Edit</Link>
                <button onClick={(e) => {
                    handleDelete(itineray._id); //no need for pet._id cus we already have the id info in this page
                }}>Delete</button>
            </div>

        </div>
    )
};
export default Details;
