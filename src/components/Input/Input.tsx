import type { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  category: string;
  values: string[];
};

const Input: FC<Props> = () => {
  return (
    <div>
      <label htmlFor=''></label>
      <input type='text' />
    </div>
  );
};

export default Input;
