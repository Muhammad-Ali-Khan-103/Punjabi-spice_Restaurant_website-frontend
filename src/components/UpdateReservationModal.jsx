import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'; // Import toast from react-hot-toast

const UpdateReservationModal = ({ reservation, onClose, onUpdate }) => {
    const [updatedReservation, setUpdatedReservation] = useState({
        firstName: reservation.firstName,
        lastName: reservation.lastName,
        email: reservation.email,
        phone: reservation.phone,
        date: reservation.date,
        time: reservation.time
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedReservation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/api/v1/reservation/put/${reservation._id}`, updatedReservation);
            if (response.data.success) {
              // update the state of all  reservation
                toast.success("Reservation updated successfully"); // Show success toast notification
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                // rerender the state here
             
                onUpdate(updatedReservation); // Call onUpdate with the updated reservation
                onClose(); // Close the modal after successful update
            } else {
                toast.error("Failed to update reservation"); // Show error toast notification
            }
        } catch (error) {
            console.error(error);
            toast.error("Fail to update reservation"); // Show error toast notification
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal update-form">
                <button onClick={onClose} className="close-button">Close</button>
                <h2>Update Reservation</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="firstName" value={updatedReservation.firstName} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={updatedReservation.lastName} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={updatedReservation.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="tel" name="phone" value={updatedReservation.phone} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input type="date" name="date" value={updatedReservation.date} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Time:</label>
                        <input type="time" name="time" value={updatedReservation.time} onChange={handleChange} />
                    </div>
                    <button type="submit" className="update-button">Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateReservationModal;
