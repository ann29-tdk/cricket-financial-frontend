// import React, { useState } from 'react';
// import Navbar from './components/Navbar';
// import PlayerSection from './components/PlayerSection';
// import MatchSection from './components/MatchSection';
// import AddPlayerModal from './components/AddPlayerModal';
// import AddMatchModal from './components/AddMatchModal';
// import MatchDetailModal from './components/MatchDetailModal';
// import styled from 'styled-components';

// const AppContainer = styled.div`
//   padding: 20px;
// `;

// function App() {
//   const [activeSection, setActiveSection] = useState('Team A');
//   const [showPlayerModal, setShowPlayerModal] = useState(false);
//   const [showMatchModal, setShowMatchModal] = useState(false);
//   const [selectedMatch, setSelectedMatch] = useState(null);

//   return (
//     <AppContainer>
//       <Navbar
//         setActiveSection={setActiveSection}
//         onAddPlayer={() => setShowPlayerModal(true)}
//         onAddMatch={() => setShowMatchModal(true)}
//       />
//       {activeSection === 'Team A' && <PlayerSection team="Team A" />}
//       {activeSection === 'Team B' && <PlayerSection team="Team B" />}
//       {activeSection === 'Matches' && <MatchSection onMatchClick={setSelectedMatch} />}
//       <AddPlayerModal
//         show={showPlayerModal}
//         handleClose={() => setShowPlayerModal(false)}
//       />
//       <AddMatchModal
//         show={showMatchModal}
//         handleClose={() => setShowMatchModal(false)}
//       />
//       {selectedMatch && (
//         <MatchDetailModal
//           match={selectedMatch}
//           handleClose={() => setSelectedMatch(null)}
//         />
//       )}
//     </AppContainer>
//   );
// }

// export default App;

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PlayerSection from './components/PlayerSection';
import MatchSection from './components/MatchSection';
import TeamFundSection from './components/TeamFundSection'; // Import TeamFundSection
import AddPlayerModal from './components/AddPlayerModal';
import AddMatchModal from './components/AddMatchModal';
import MatchDetailModal from './components/MatchDetailModal';
import styled from 'styled-components';

const AppContainer = styled.div`
  padding: 20px;
`;

function App() {
  const [activeSection, setActiveSection] = useState('Team A');
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
    <AppContainer>
      <Navbar
        setActiveSection={setActiveSection}
        onAddPlayer={() => setShowPlayerModal(true)}
        onAddMatch={() => setShowMatchModal(true)}
      />
      {activeSection === 'Team A' && <PlayerSection team="Team A" />}
      {activeSection === 'Team B' && <PlayerSection team="Team B" />}
      {activeSection === 'Matches' && <MatchSection onMatchClick={setSelectedMatch} />}
      {activeSection === 'Team Fund' && <TeamFundSection />} {/* Add TeamFundSection */}

      <AddPlayerModal
        show={showPlayerModal}
        handleClose={() => setShowPlayerModal(false)}
      />
      <AddMatchModal
        show={showMatchModal}
        handleClose={() => setShowMatchModal(false)}
      />
      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          handleClose={() => setSelectedMatch(null)}
        />
      )}
    </AppContainer>
  );
}

export default App;
