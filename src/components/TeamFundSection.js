import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Row, Col, Form, Container } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

const TeamFundContainer = styled(Container)`
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const CurrentFundDisplay = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const StyledInput = styled(Form.Control)`
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ResponsiveTable = styled(Table)`
  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

function TeamFundSection() {
  const [currentFund, setCurrentFund] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showFundModal, setShowFundModal] = useState(false);
  const [showExpenditureModal, setShowExpenditureModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({ playerName: '', amount: '', date: '', remarks: '' });
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [manualFundUpdate, setManualFundUpdate] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('https://pine-bronzed-grease.glitch.me/team-fund');
      setTransactions(response.data);
      if (response.data.length > 0) {
        setCurrentFund(response.data[0].currentTeamFund);
      }
    } catch (err) {
      console.error('Failed to fetch transactions', err);
    }
  };

  const handleAddFund = async () => {
    try {
      const response = await axios.post('https://pine-bronzed-grease.glitch.me/team-fund', {
        type: 'fund',
        playerName: newTransaction.playerName,
        amount: parseFloat(newTransaction.amount),
        date: newTransaction.date || new Date().toISOString().split('T')[0],
      });
      setCurrentFund(response.data.currentTeamFund);
      setTransactions([response.data, ...transactions]);
    } catch (err) {
      console.error('Failed to add fund', err);
    }
    setNewTransaction({ playerName: '', amount: '', date: '', remarks: '' });
    setShowFundModal(false);
  };

  const handleAddExpenditure = async () => {
    try {
      const response = await axios.post('https://pine-bronzed-grease.glitch.me/team-fund', {
        type: 'expenditure',
        playerName: newTransaction.playerName,
        amount: parseFloat(newTransaction.amount),
        date: new Date().toISOString().split('T')[0],
        remarks: newTransaction.remarks,
      });
      setCurrentFund(response.data.currentTeamFund);
      setTransactions([response.data, ...transactions]);
    } catch (err) {
      console.error('Failed to add expenditure', err);
    }
    setNewTransaction({ playerName: '', amount: '', date: '', remarks: '' });
    setShowExpenditureModal(false);
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const response = await axios.delete(`https://pine-bronzed-grease.glitch.me/team-fund/${transactionId}`);
      setCurrentFund(response.data.currentTeamFund);
      setTransactions(transactions.filter(t => t._id !== transactionId));
    } catch (err) {
      console.error('Failed to delete transaction', err);
    }
  };

  const handleFundUpdate = async () => {
    try {
      const response = await axios.post('https://pine-bronzed-grease.glitch.me/team-fund/update-fund', { currentTeamFund: parseFloat(manualFundUpdate) });
      setCurrentFund(response.data.currentTeamFund);
      fetchTransactions();
      setManualFundUpdate('');
    } catch (err) {
      console.error('Failed to update fund:', err);
    }
  };

  const handleFilterChange = (month, year) => {
    setFilterMonth(month);
    setFilterYear(year);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const transactionMonth = transactionDate.getMonth() + 1;
    const transactionYear = transactionDate.getFullYear();
    const isMonthMatch = filterMonth ? transactionMonth === parseInt(filterMonth) : true;
    const isYearMatch = filterYear ? transactionYear === parseInt(filterYear) : true;
    return isMonthMatch && isYearMatch;
  });

  return (
    <TeamFundContainer>
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <CurrentFundDisplay>Current Team Fund: ₹{currentFund.toFixed(2)}</CurrentFundDisplay>
        </Col>
        <Col xs={12} md={6}>
          <Form.Control
            type="number"
            value={manualFundUpdate}
            onChange={(e) => setManualFundUpdate(e.target.value)}
            placeholder="Enter new fund value"
          />
          <Button variant="secondary" onClick={handleFundUpdate} className="mt-2">Update Fund</Button>
        </Col>
      </Row>

      <ButtonGroup>
        <Button variant="primary" onClick={() => setShowFundModal(true)}>Add Fund</Button>
        <Button variant="danger" onClick={() => setShowExpenditureModal(true)}>Add Expenditure</Button>
      </ButtonGroup>

      <Row className="mb-3">
        <Col xs={12} sm={6} md={3}>
          <Form.Select value={filterMonth} onChange={(e) => handleFilterChange(e.target.value, filterYear)}>
            <option value="">Filter by Month</option>
            {[...Array(12)].map((_, index) => (
              <option key={index + 1} value={index + 1}>{index + 1}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Form.Select value={filterYear} onChange={(e) => handleFilterChange(filterMonth, e.target.value)}>
            <option value="">Filter by Year</option>
            {Array.from(new Set(transactions.map(trx => new Date(trx.date).getFullYear()))).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <ResponsiveTable responsive striped bordered hover>
        <thead>
          <tr>
            <th>Player/Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Remarks</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.playerName}</td>
              <td>₹{transaction.amount.toFixed(2)}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.remarks || '-'}</td>
              <td>{transaction.type}</td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDeleteTransaction(transaction._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </ResponsiveTable>

      <Modal show={showFundModal} onHide={() => setShowFundModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Fund</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledInput
            type="text"
            placeholder="Player Name"
            value={newTransaction.playerName}
            onChange={(e) => setNewTransaction({ ...newTransaction, playerName: e.target.value })}
          />
          <StyledInput
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          />
          <StyledInput
            type="date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFundModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddFund}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showExpenditureModal} onHide={() => setShowExpenditureModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expenditure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledInput
            type="text"
            placeholder="Name"
            value={newTransaction.playerName}
            onChange={(e) => setNewTransaction({ ...newTransaction, playerName: e.target.value })}
          />
          <StyledInput
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          />
          <StyledInput
            type="text"
            placeholder="Remarks"
            value={newTransaction.remarks}
            onChange={(e) => setNewTransaction({ ...newTransaction, remarks: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowExpenditureModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddExpenditure}>Save</Button>
        </Modal.Footer>
      </Modal>
    </TeamFundContainer>
  );
}

export default TeamFundSection;