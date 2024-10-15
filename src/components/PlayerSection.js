import React, { useState, useEffect } from 'react';
import axios from '../api';
import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import EditPlayerModal from './EditPlayerModal';

const PlayerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const PlayerSection = ({ team }) => {
  const [players, setPlayers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, [team]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('/players');
      setPlayers(response.data.filter((player) => player.team === team));
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      try {
        await axios.delete(`/players/${id}`);
        setPlayers(players.filter((player) => player._id !== id));
      } catch (error) {
        console.error("Error deleting player:", error);
      }
    }
  };

  const handleEdit = (player) => {
    setSelectedPlayer(player);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedPlayer(null);
  };

  const handleSaveEdit = async (updatedPlayer) => {
    try {
      await axios.put(`/players/${updatedPlayer._id}`, updatedPlayer);
      fetchPlayers(); // Refresh the list after editing
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  return (
    <>
      <PlayerContainer>
        {players.map((player) => (
          <Card key={player._id} style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{player.name}</Card.Title>
              <Card.Text>Team: {player.team}</Card.Text>
              <Card.Text>Batting Style: {player.battingStyle || 'N/A'}</Card.Text> {/* Display batting style */}
              <Card.Text>Bowling Style: {player.bowlingStyle || 'N/A'}</Card.Text> {/* Display bowling style */}
              <Button variant="warning" className="mr-2" onClick={() => handleEdit(player)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(player._id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </PlayerContainer>

      <EditPlayerModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        player={selectedPlayer}
        handleSave={handleSaveEdit}
      />
    </>
  );
};

export default PlayerSection;
