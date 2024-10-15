// import React from 'react';
// import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
// import styled from 'styled-components';

// // Styled Component for Navbar
// const StyledNavbar = styled(BootstrapNavbar)`
//   margin-bottom: 20px;
//   background-color: #f8f9fa; /* Lighter background color */
//   padding: 10px;

//   .nav-link {
//     color: #333;
//     &:hover {
//       color: #007bff;
//     }
//   }

//   .nav-link.active {
//     font-weight: bold;
//     color: #007bff; /* Highlight color for active link */
//   }

//   @media (max-width: 768px) {
//     .navbar-nav {
//       flex-direction: column;
//       align-items: center;
//     }
//     .navbar-brand {
//       text-align: center;
//       width: 100%;
//     }
//     .ml-auto {
//       margin-left: 0;
//       width: 100%;
//       display: flex;
//       justify-content: space-around;
//       margin-top: 10px;
//     }
//     .btn {
//       width: 100px;
//       margin-bottom: 5px;
//     }
//   }

//   @media (min-width: 768px) {
//     .ml-auto {
//       margin-left: auto;
//     }
//   }
// `;

// // Navbar Component
// const Navbar = ({ setActiveSection, onAddPlayer, onAddMatch, activeSection }) => {
//   return (
//     <StyledNavbar expand="lg">
//       <BootstrapNavbar.Brand>Dashboard</BootstrapNavbar.Brand>
//       <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
//       <BootstrapNavbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//           <Nav.Link
//             onClick={() => setActiveSection('Team A')}
//             className={activeSection === 'Team A' ? 'active' : ''}
//           >
//             Team A
//           </Nav.Link>
//           <Nav.Link
//             onClick={() => setActiveSection('Team B')}
//             className={activeSection === 'Team B' ? 'active' : ''}
//           >
//             Team B
//           </Nav.Link>
//           <Nav.Link
//             onClick={() => setActiveSection('Matches')}
//             className={activeSection === 'Matches' ? 'active' : ''}
//           >
//             Matches
//           </Nav.Link>
//         </Nav>
//         <Nav className="ml-auto">
//           <Button variant="primary" onClick={onAddPlayer}>Add Player</Button>
//           <Button variant="success" onClick={onAddMatch} className="ml-2">Add Match</Button>
//         </Nav>
//       </BootstrapNavbar.Collapse>
//     </StyledNavbar>
//   );
// };

// export default Navbar;


import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import styled from 'styled-components';

// Styled Component for Navbar
const StyledNavbar = styled(BootstrapNavbar)`
  margin-bottom: 20px;
  background-color: #f8f9fa; /* Lighter background color */
  padding: 10px;

  .nav-link {
    color: #333;
    &:hover {
      color: #007bff;
    }
  }

  .nav-link.active {
    font-weight: bold;
    color: #007bff; /* Highlight color for active link */
  }

  @media (max-width: 768px) {
    .navbar-nav {
      flex-direction: column;
      align-items: center;
    }
    .navbar-brand {
      text-align: center;
      width: 100%;
    }
    .ml-auto {
      margin-left: 0;
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
    }
    .btn {
      width: 100px;
      margin-bottom: 5px;
    }
  }

  @media (min-width: 768px) {
    .ml-auto {
      margin-left: auto;
    }
  }
`;

// Navbar Component
const Navbar = ({ setActiveSection, onAddPlayer, onAddMatch, activeSection }) => {
  return (
    <StyledNavbar expand="lg">
      <BootstrapNavbar.Brand>Dashboard</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            onClick={() => setActiveSection('Team A')}
            className={activeSection === 'Team A' ? 'active' : ''}
          >
            Team A
          </Nav.Link>
          <Nav.Link
            onClick={() => setActiveSection('Team B')}
            className={activeSection === 'Team B' ? 'active' : ''}
          >
            Team B
          </Nav.Link>
          <Nav.Link
            onClick={() => setActiveSection('Matches')}
            className={activeSection === 'Matches' ? 'active' : ''}
          >
            Matches
          </Nav.Link>
          <Nav.Link
            onClick={() => setActiveSection('Team Fund')}
            className={activeSection === 'Team Fund' ? 'active' : ''}
          >
            Team Fund
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Button variant="primary" onClick={onAddPlayer}>Add Player</Button>
          <Button variant="success" onClick={onAddMatch} className="ml-2">Add Match</Button>
        </Nav>
      </BootstrapNavbar.Collapse>
    </StyledNavbar>
  );
};

export default Navbar;
