import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { inputsData } from '../../data/data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import FilterResults from '../FilterResult/FilterResult';

type StandardInputs = Record<string, string>;
type CheckboxInputs = {
  checkbox: string[];
};
type Inputs = StandardInputs & CheckboxInputs;

type SearchParamsObj = Record<string, string[]>;

const Filter: FC = () => {
  const convertSearchParamsToObject = (data: URLSearchParams) => {
    const obj: SearchParamsObj = {};
    for (const [key, value] of data.entries()) {
      if (!obj[key]) {
        obj[key] = [value];
      } else {
        obj[key].push(value);
      }
    }
    return obj;
  };

  const { handleSubmit, register } = useForm<Inputs>();
  const [search, setSearch] = useSearchParams();
  const [filter, setFilter] = useState<SearchParamsObj>(convertSearchParamsToObject(search));

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const filteredTrueValues = Object.entries(data).filter(([_, value]) => {
      return Boolean(value);
    });
    const convertToObject = Object.fromEntries(filteredTrueValues);
    setSearch(convertToObject);
  };

  useEffect(() => {
    setFilter(convertSearchParamsToObject(search));
  }, [search]);

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
                      defaultChecked={search.getAll(input.name).includes(variant)}
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
            defaultValue={search.get('min') || ''}
          />
        </div>
        <div>
          <label htmlFor='max'>Max</label>
          <input
            type='number'
            id='max'
            {...register('max')}
            defaultValue={search.get('max') || ''}
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
            defaultChecked={search.get('radio') === '1'}
          />
        </div>
        <div>
          <label htmlFor='2'>2</label>
          <input
            type='radio'
            id='2'
            value='2'
            {...register('radio')}
            defaultChecked={search.get('radio') === '2'}
          />
        </div>
        <div>
          <label htmlFor='3'>3</label>
          <input
            type='radio'
            id='3'
            value='3'
            {...register('radio')}
            defaultChecked={search.get('radio') === '3'}
          />
        </div>
        <div>
          <label htmlFor='4'>4</label>
          <input
            type='radio'
            id='4'
            value='4'
            {...register('radio')}
            defaultChecked={search.get('radio') === '4'}
          />
        </div>
        <div>
          <label htmlFor='5'>5</label>
          <input
            type='radio'
            id='5'
            value='5'
            {...register('radio')}
            defaultChecked={search.get('radio') === '5'}
          />
        </div>
        <button>Apply filters</button>
      </form>
      {Object.keys(filter).length > 0 && <FilterResults filter={filter} />}
    </div>
  );
};

export default Filter;
