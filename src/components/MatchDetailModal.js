import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Spinner } from 'react-bootstrap';
import axios from '../api';

const MatchDetailModal = ({ match, handleClose }) => {
  const [players, setPlayers] = useState([]);
  const [roster, setRoster] = useState([]);
  const [totalCollected, setTotalCollected] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayersAndMatchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [playersResponse, matchResponse] = await Promise.all([
          axios.get('/players'),
          axios.get(`/matches/${match._id}`)
        ]);

        setPlayers(playersResponse.data);

        const matchData = matchResponse.data;
        setRoster(matchData.players.map(player => ({
          playerId: player.player._id,
          name: player.player.name,
          paid: player.paidAmount,
          balance: player.player.balance // Include balance from player data
        })));

        const totalPaid = matchData.players.reduce((sum, p) => sum + p.paidAmount, 0);
        setTotalCollected(totalPaid);
      } catch (error) {
        console.error("Error fetching match and players data", error);
        setError("Failed to load match data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayersAndMatchData();
  }, [match]);

  const handleAddPlayerToRoster = (playerId) => {
    const player = players.find((p) => p._id === playerId);
    if (player && !roster.some((p) => p.playerId === playerId)) {
      const updatedRoster = [...roster, { playerId: player._id, name: player.name, paid: 0, balance: player.balance }];
      setRoster(updatedRoster);
      updateTotalCollected(updatedRoster);
    }
  };

  const handlePaymentChange = (playerId, paid) => {
    const updatedRoster = roster.map((p) =>
      p.playerId === playerId ? { ...p, paid: parseFloat(paid) || 0 } : p
    );
    setRoster(updatedRoster);
    updateTotalCollected(updatedRoster);
  };

  const handleRemovePlayer = async (playerId) => {
    try {
      await axios.delete(`/matches/${match._id}/players/${playerId}`);
      const updatedRoster = roster.filter((p) => p.playerId !== playerId);
      setRoster(updatedRoster);
      updateTotalCollected(updatedRoster);
    } catch (error) {
      console.error("Error removing player from match", error);
      setError("Failed to remove player. Please try again.");
    }
  };

  const updateTotalCollected = (updatedRoster) => {
    const totalPaid = updatedRoster.reduce((acc, curr) => acc + curr.paid, 0);
    setTotalCollected(totalPaid);
  };

  const savePayments = async () => {
    setIsLoading(true);
    setError(null);
    const updatedPlayers = roster.map((p) => ({
      player: p.playerId,
      paidAmount: p.paid,
    }));

    try {
      await axios.put(`/matches/${match._id}/players`, { players: updatedPlayers });

      // Re-fetch match data to reflect updated player balances
      const updatedMatchResponse = await axios.get(`/matches/${match._id}`);
      const updatedMatch = updatedMatchResponse.data;

      setRoster(updatedMatch.players.map(player => ({
        playerId: player.player._id,
        name: player.player.name,
        paid: player.paidAmount,
        balance: player.player.balance, // Updated balance from the player data
      })));

      updateTotalCollected(updatedMatch.players);

      handleClose();
    } catch (error) {
      console.error("Error saving payments", error);
      setError("Failed to save payments. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const remainingBookingFee = match.bookingFee - totalCollected;

  if (isLoading) {
    return (
      <Modal show onHide={handleClose} size="lg">
        <Modal.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Modal.Body>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal show onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{error}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Match Details - {match.groundName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <h4>Match Information</h4>
            <p>Ground Location: {match.groundLocation}</p>
            <p>Booking Fee: {match.bookingFee}</p>
            <p>Fee Per Person: {match.feePerPerson}</p>
            <p>Match Date & Time: {new Date(match.dateTime).toLocaleString()}</p>
            <a href={match.googleMapLink} target="_blank" rel="noopener noreferrer">
              View Ground on Google Maps
            </a>
          </div>
          <div className="col-md-6">
            <h4>Roster & Payments</h4>
            <Form>
              <Form.Group>
                <Form.Label>Add Player to Roster</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => handleAddPlayerToRoster(e.target.value)}
                >
                  <option value="">Select Player</option>
                  {players.map((player) => (
                    <option key={player._id} value={player._id}>
                      {player.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Player Name</th>
                  <th>Amount Paid</th>
                  <th>Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((p) => {
                  const updatedBalance = p.balance + p.paid - match.feePerPerson;
                  return (
                    <tr key={p.playerId}>
                      <td>{p.name}</td>
                      <td>
                        <Form.Control
                          type="number"
                          value={p.paid}
                          onChange={(e) => handlePaymentChange(p.playerId, e.target.value)}
                        />
                      </td>
                      <td>{updatedBalance}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemovePlayer(p.playerId)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <h5>Total Collected: {totalCollected}</h5>
            <h5>Remaining Booking Fee: {remainingBookingFee}</h5>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={savePayments} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Payments'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MatchDetailModal;
