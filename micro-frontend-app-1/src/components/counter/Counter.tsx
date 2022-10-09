import "ojs/ojbutton";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojknockout";
import "ojs/ojlabel";

import { h } from "preact";
import { useState } from 'preact/hooks';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  decrement,
  increment, incrementAsync, incrementByAmount, incrementIfOdd,
  selectCount
} from './counter-slice';

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: blue;
`;


const Label = styled.h4`
  font-size: 2em;
  text-align: center;
  color: red;
`;



export function Counter(props: {
  name: string
}) {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <Title>Components: {props.name}</Title>
      
      <oj-form-layout max-columns="3" direction="column">

        <oj-button id="button1"
          onClick={() => dispatch(decrement())}>-</oj-button>

        <Label>{count}</Label>
        <oj-button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </oj-button>
      </oj-form-layout>
      <oj-form-layout max-columns="2" direction="row">

        <oj-input-text
          aria-label="Set increment amount"
          value={incrementAmount}
          onvalueChanged={(e) => setIncrementAmount((e.target as any).value)}
        />
        <oj-button
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </oj-button>
        <oj-button
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </oj-button>
        <oj-button
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </oj-button>
      </oj-form-layout >
    </div>
  );
}



export default Counter;