import type { FC } from 'react';
import { Link } from 'react-router-dom';

const Main: FC = () => {
  return (
    <div>
      <h1>Main</h1>
      <Link to='filter'>Go to filter</Link>
    </div>
  );
};

export default Main;
