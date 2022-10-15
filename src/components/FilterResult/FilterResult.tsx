import type { FC } from 'react';

type Props = {
  filter: [string, string | string[]][];
};

const FilterResult: FC<Props> = ({ filter }) => {
  const toArray = filter.map(([key, value]) => {
    let test: string;
    if (Array.isArray(value)) {
      test = value.join(', ');
    } else {
      test = value;
    }
    return [key, test];
  });
  return (
    <>
      <h3>Applied filters:</h3>
      <div>
        {toArray.map(([key, value]) => {
          return (
            <div>
              <span>Category: {key} </span>
              <span>Filters: {value} </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FilterResult;
