import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateReservationModal from "../components/UpdateReservationModal";
import toast from 'react-hot-toast'; // Import toast from react-hot-toast

const AllReservations = () => {
    const [data, setData] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null); // State to hold the selected reservation
    const [showUpdateModal, setShowUpdateModal] = useState(false); // State to control the visibility of the update modal

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/reservation/get-all-reservations");
                setData(response.data.reservations);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, []);

    const handleUpdate = (reservation) => {
        setSelectedReservation(reservation); // Set the selected reservation
        setShowUpdateModal(true); // Open the update modal
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/v1/reservation/delete/${id}`);
            if (response) {
                // Remove the deleted reservation from the data state
                setData(prevData => prevData.filter(item => item._id !== id));
                toast.success("Reservation deleted successfully"); // Display success message
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete reservation"); // Display error message
        }
    };

    const handleReservationUpdate = async (updatedReservation) => {
        try {
            // Update the data state with the updated reservation
            setData(prevData => prevData.map(item => (item._id === updatedReservation._id ? updatedReservation : item)));
        } catch (error) {
            console.error(error);
        }
    };

    //function to change state upon update
    const updateAllReservations = (updatedReservation) => {
        setData(prevData => prevData.map(item => (item._id === updatedReservation._id ? updatedReservation : item)));
    };
    

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
                        <th>Actions</th>
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
                            <td>
                                <div className="action-buttons">
                                    <button onClick={() => handleUpdate(item)} className="update-button">Update</button>
                                    <button onClick={() => handleDelete(item._id)} className="delete-button">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Render the update modal if showUpdateModal is true */}
            {showUpdateModal && (
                <UpdateReservationModal
                    reservation={selectedReservation}
                    onClose={() => setShowUpdateModal(false)} // Close the modal when user clicks outside or on close button
                    onUpdate={handleReservationUpdate} // Pass the update function to the modal
                    updateAllReservations={updateAllReservations}
                />
            )}
        </div>
    );
}

export default AllReservations;
