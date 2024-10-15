import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditPlayerModal = ({ show, handleClose, player, handleSave }) => {
  const [editedPlayer, setEditedPlayer] = useState({
    name: '',
    team: '',
    battingStyle: '',  // New field
    bowlingStyle: '',  // New field
  });

  useEffect(() => {
    if (player) {
      setEditedPlayer({
        ...player,
      });
    }
  }, [player]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPlayer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(editedPlayer);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedPlayer.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Team</Form.Label>
            <Form.Control
              as="select"
              name="team"
              value={editedPlayer.team}
              onChange={handleChange}
              required
            >
              <option value="">Select Team</option>
              <option value="Team A">Team A</option>
              <option value="Team B">Team B</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Batting Style</Form.Label>
            <Form.Control
              as="select"
              name="battingStyle"
              value={editedPlayer.battingStyle}
              onChange={handleChange}
            >
              <option value="">Select Batting Style</option>
              <option value="Right-Handed">Right-Handed</option>
              <option value="Left-Handed">Left-Handed</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Bowling Style</Form.Label>
            <Form.Control
              as="select"
              name="bowlingStyle"
              value={editedPlayer.bowlingStyle}
              onChange={handleChange}
            >
              <option value="">Select Bowling Style</option>
              <option value="Fast Bowler">Fast Bowler</option>
              <option value="Fast-Medium Bowler">Fast-Medium Bowler</option>
              <option value="Medium-Fast Bowler">Medium-Fast Bowler</option>
              <option value="Medium-Pace Bowler">Medium-Pace Bowler</option>
              <option value="Left-Arm Off-Spin">Left-Arm Off-Spin</option>
              <option value="Right-Arm Off-Spin">Right-Arm Off-Spin</option>
              <option value="Left-Arm Leg-Spin">Left-Arm Leg-Spin</option>
              <option value="Right-Arm Leg-Spin">Right-Arm Leg-Spin</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPlayerModal;
