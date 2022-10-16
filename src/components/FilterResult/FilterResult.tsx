import type { FC } from 'react';

type SearchParamsObj = Record<string, string[]>;

type Props = {
  filter: SearchParamsObj;
};

const FilterResult: FC<Props> = ({ filter }) => {
  const toArray = () => {
    return Object.entries(filter).map(([key, values]) => {
      return [key, values.join(', ')];
    });
  };
  return (
    <div>
      <h2>Applied filters</h2>
      {toArray().map((item, i) => {
        return (
          <div key={i}>
            <span>CATEGORY:{item[0]} </span>
            <span>FILTERS:{item[1]} </span>
          </div>
        );
      })}
    </div>
  );
};

export default FilterResult;
