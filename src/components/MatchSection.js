import React, { useState, useEffect } from 'react';
import axios from '../api';
import { Card, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { format, parseISO } from 'date-fns'; // Import date-fns for date formatting
import EditMatchModal from './EditMatchModal';

const MatchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const MatchSection = ({ onMatchClick }) => {
  const [matches, setMatches] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get('/matches');
      // Sort matches by date in descending order (most recent first)
      const sortedMatches = response.data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
      setMatches(sortedMatches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const handleDelete = async (matchId) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      try {
        await axios.delete(`/matches/${matchId}`);
        fetchMatches(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting match:", error);
      }
    }
  };

  const handleEdit = (match) => {
    setSelectedMatch(match);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedMatch(null);
  };

  const handleSaveEdit = async (updatedMatch) => {
    try {
      await axios.put(`/matches/${updatedMatch._id}`, updatedMatch);
      fetchMatches(); // Refresh the list after editing
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

  return (
    <>
      <MatchContainer>
        {matches.map((match) => (
          <Card key={match._id} style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{match.groundName}</Card.Title>
              <Card.Text>
                Location: {match.groundLocation} <br />
                Booking Fee: {match.bookingFee} <br />
                Fee Per Person: {match.feePerPerson} <br />
                Date: {match.dateTime ? format(parseISO(match.dateTime), 'yyyy-MM-dd') : 'Invalid date'} {/* Use dateTime */}
              </Card.Text>
              <Button variant="info" onClick={() => onMatchClick(match)}>
                View Details
              </Button>
              <Button variant="warning" onClick={() => handleEdit(match)} className="mx-2">
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(match._id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </MatchContainer>

      <EditMatchModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        match={selectedMatch}
        handleSave={handleSaveEdit}
      />
    </>
  );
};

export default MatchSection;
