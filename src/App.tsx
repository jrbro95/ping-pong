import React from 'react';
import Canvas from './canvas';

const App: React.FC = () => {
  return (
    <div>
      <h1>Ping-pong</h1>
      <Canvas width={400} height={400} />
    </div>
  );
};

export default App;