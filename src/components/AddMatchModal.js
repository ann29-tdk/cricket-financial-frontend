import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from '../api';

const AddMatchModal = ({ show, handleClose }) => {
  const [groundName, setGroundName] = useState('');
  const [groundLocation, setGroundLocation] = useState('');
  const [googleMapLink, setGoogleMapLink] = useState('');
  const [bookingFee, setBookingFee] = useState('');
  const [feePerPerson, setFeePerPerson] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [error, setError] = useState(''); // State to manage validation errors

  const handleSave = async () => {
    // Validate that required fields are not empty
    if (!groundName.trim() || !groundLocation.trim() || !bookingFee || !feePerPerson || !dateTime.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    // Reset error and proceed to save
    setError('');

    try {
      await axios.post('/matches', {
        groundName,
        groundLocation,
        googleMapLink,
        bookingFee,
        feePerPerson,
        dateTime,
      });
      // Close the modal
      handleClose();
      // Reload the page to refresh the match list
      window.location.reload();
    } catch (err) {
      setError('Failed to save match. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Match</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group>
            <Form.Label>Ground Name</Form.Label>
            <Form.Control
              type="text"
              value={groundName}
              onChange={(e) => setGroundName(e.target.value)}
              placeholder="Enter ground name"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ground Location</Form.Label>
            <Form.Control
              type="text"
              value={groundLocation}
              onChange={(e) => setGroundLocation(e.target.value)}
              placeholder="Enter ground location"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Google Map Link</Form.Label>
            <Form.Control
              type="text"
              value={googleMapLink}
              onChange={(e) => setGoogleMapLink(e.target.value)}
              placeholder="Enter Google Map link"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Booking Fee</Form.Label>
            <Form.Control
              type="number"
              value={bookingFee}
              onChange={(e) => setBookingFee(e.target.value)}
              placeholder="Enter booking fee"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fee Per Person</Form.Label>
            <Form.Control
              type="number"
              value={feePerPerson}
              onChange={(e) => setFeePerPerson(e.target.value)}
              placeholder="Enter fee per person"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date & Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Match
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddMatchModal;
