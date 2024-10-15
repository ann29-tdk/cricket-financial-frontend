import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPlayerModal = ({ show, handleClose }) => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('Team A');
  const [battingStyle, setBattingStyle] = useState('');
  const [bowlingStyle, setBowlingStyle] = useState('');

  const handleSave = async () => {
    // Validation: Check if the name and team are filled
    if (!name.trim()) {
      toast.warn('Player name cannot be empty');
      return;
    }

    if (!team.trim()) {
      toast.warn('Please select a team');
      return;
    }

    // Proceed to save if all validations pass
    try {
      await axios.post('/players', { name, team, battingStyle, bowlingStyle });
      toast.success('Player added successfully');
      // Close the modal
      handleClose();
      // Reload the page to refresh the player list
      window.location.reload();
    } catch (error) {
      toast.error('An error occurred while saving the player');
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Player Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter player name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Team</Form.Label>
              <Form.Control as="select" value={team} onChange={(e) => setTeam(e.target.value)}>
                <option value="Team A">Team A</option>
                <option value="Team B">Team B</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Batting Style</Form.Label>
              <Form.Control
                as="select"
                value={battingStyle}
                onChange={(e) => setBattingStyle(e.target.value)}
              >
                <option value="">Select Batting Style</option>
                <option value="Right-Handed">Right-Handed</option>
                <option value="Left-Handed">Left-Handed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Bowling Style</Form.Label>
              <Form.Control
                as="select"
                value={bowlingStyle}
                onChange={(e) => setBowlingStyle(e.target.value)}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Player
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddPlayerModal;
