import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

const Details = (props) => {
    const [person, setPerson] = useState(null); //reason why u want [] on the other one and this one is becasue other one is empty array and this one u want an empty object
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/itinerays/" + id)
            .then((res)=> {
                setPerson(res.data); //wtf is res.data mean LOL

            })
            .catch((err)=>{
                console.log(err.response);
            })
        }, [id]); //why do u use id here????
    
    const handleDelete = (delId) => {
        axios
        .delete("http://localhost:8000/api/itinerays/" + delId) //u dont need del id because u only deleting one thing and the page has the id
        .then((res)=> {
            history.push("/Departments/contacts/");
        })
        .catch((err)=>{
            console.log(err.response);
        });

    };

    //response hasnt come back yet
    if(person===null){
        return "Loading..."; //this could be loading spinner or gif
    }

    return (
        <div style={{ 
            padding:15, 
            borderRadius:10, 
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            width: "60%",
            margin: "0 auto", //meaning???
            marginBottom: 20,
        }}> 
                <div><Link to="/Departments/Contacts">Home</Link></div>
    {/* u use _id when it the id comes from the database object NOT the url :id and regular id is ONLY with urls */}
            <div style={{ padding:15 }}>
                <h2>{person.lastName}, {person.firstName}</h2>
                <p>Department: {person.department}</p>
                <p>Title: {person.title}</p>
                <p>Email: {person.email}</p>
                <p>Phone: {person.phone}</p>
            </div>

            <div>
                <Link to={`/Departments/Contacts/${person._id}/edit`}>Edit</Link>
                <button onClick={(e)=>{
                    handleDelete(person._id); //no need for pet._id cus we already have the id info in this page
                }}>Delete</button>
            </div>

        </div>
    )};
export default Details;
