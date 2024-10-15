import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditMatchModal = ({ show, handleClose, match, handleSave }) => {
  const [editedMatch, setEditedMatch] = useState({
    groundName: '',
    groundLocation: '',
    googleMapLink: '',
    bookingFee: 0,
    feePerPerson: 0,
    dateTime: '',
  });

  useEffect(() => {
    if (match) {
      // Format the dateTime to 'YYYY-MM-DDTHH:MM' for the input field
      const formattedDateTime = match.dateTime
        ? new Date(match.dateTime).toISOString().slice(0, 16)
        : '';
      
      setEditedMatch({
        ...match,
        dateTime: formattedDateTime, // Set formatted date and time for the input
      });
    }
  }, [match]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMatch(prev => ({
      ...prev,
      [name]: name === 'bookingFee' || name === 'feePerPerson' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(editedMatch);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Match</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Ground Name</Form.Label>
            <Form.Control
              type="text"
              name="groundName"
              value={editedMatch.groundName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ground Location</Form.Label>
            <Form.Control
              type="text"
              name="groundLocation"
              value={editedMatch.groundLocation}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Google Map Link</Form.Label>
            <Form.Control
              type="text"
              name="googleMapLink"
              value={editedMatch.googleMapLink}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Booking Fee</Form.Label>
            <Form.Control
              type="number"
              name="bookingFee"
              value={editedMatch.bookingFee}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fee Per Person</Form.Label>
            <Form.Control
              type="number"
              name="feePerPerson"
              value={editedMatch.feePerPerson}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date and Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="dateTime"
              value={editedMatch.dateTime}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditMatchModal;
