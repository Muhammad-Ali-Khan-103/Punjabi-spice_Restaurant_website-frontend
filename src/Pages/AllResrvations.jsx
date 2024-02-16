// Import React and other libraries
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the component
const AllReservations = () => {
    // Define the initial state and the setter function
    const [data, setData] = useState([]);

    // Define the effect hook to fetch data from the API
    useEffect(() => {
        // Define the async function to get data
        const getData = async () => {
            // Try to make the request
            try {
                // Get the response from the API endpoint
                const response = await axios.get("http://localhost:4000/api/v1/reservation/get-all-reservations");
                console.log(response.data.reservations);
                // Set the data state with the response data
                setData(response.data.reservations); // //  here we received this kind 
                /*
                [
                    {
                      "_id": "65bf3a0f7e712ef424a7f744",
                      "firstName": "muhammad",
                      "lastName": "Khan",
                      "email": "zk@gmail.com",
                      "phone": "12345678901",
                      "time": "1234",
                      "date": "1234",
                      "__v": 0
                    },
                ]
                */
            } catch (error) {
                // Handle the error
                console.error(error);
            }
        };
        // Call the function
        getData();
    }, []); // Pass an empty dependency array to run only once

    console.log(data) // data is an empty array
    // Return the JSX element to render
    return (
        <div className="data-component">
            <h1>ALL-RESERVATIONS</h1>

  
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

// Export the component
export default AllReservations;
