import type { FC } from 'react';
import { useState } from 'react';
import { inputsData } from '../../data/data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import FilterResults from '../FilterResult/FilterResult';

type StandardInputs = Record<string, string>;
type CheckboxInputs = {
  checkbox: string[];
};

type Inputs = StandardInputs & CheckboxInputs;

type Elo = [string, string | string[]][];
const Filter: FC = () => {
  const { handleSubmit, register } = useForm<Inputs>();
  const [search, setSearch] = useSearchParams();
  const [filter, setFilter] = useState<Elo | null>(null);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const filteredTrueValues = Object.entries(data).filter(([_, value]) => {
      return Boolean(value);
    });
    const convertToObject = Object.fromEntries(filteredTrueValues);
    setSearch(convertToObject);
    setFilter(filteredTrueValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputsData.map((input, i) => {
          return (
            <div key={i}>
              <h2>{input.name}</h2>
              {input.variants.map((variant, i) => {
                return (
                  <div key={i}>
                    <label htmlFor={variant}>{variant}</label>
                    <input
                      type='checkbox'
                      id={variant}
                      {...register(encodeURI(input.name))}
                      value={encodeURI(variant)}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
        <h2>Price</h2>
        <div>
          <label htmlFor='min'>Min</label>
          <input
            type='number'
            id='min'
            {...register('min')}
          />
        </div>
        <div>
          <label htmlFor='max'>Max</label>
          <input
            type='number'
            id='max'
            {...register('max')}
          />
        </div>
        <h2>Stars</h2>
        <div>
          <label htmlFor='1'>1</label>
          <input
            type='radio'
            id='1'
            value='1'
            {...register('radio')}
          />
        </div>
        <div>
          <label htmlFor='2'>2</label>
          <input
            type='radio'
            id='2'
            value='2'
            {...register('radio')}
          />
        </div>
        <div>
          <label htmlFor='3'>3</label>
          <input
            type='radio'
            id='3'
            value='3'
            {...register('radio')}
          />
        </div>
        <div>
          <label htmlFor='4'>4</label>
          <input
            type='radio'
            id='4'
            value='4'
            {...register('radio')}
          />
        </div>
        <div>
          <label htmlFor='5'>5</label>
          <input
            type='radio'
            id='5'
            value='5'
            {...register('radio')}
          />
        </div>
        <button>Apply filters</button>
        {filter && <FilterResults filter={filter} />}
      </form>
    </div>
  );
};

export default Filter;
