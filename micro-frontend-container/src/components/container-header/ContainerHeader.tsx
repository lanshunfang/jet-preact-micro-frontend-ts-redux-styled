import "ojs/ojbutton";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojknockout";
import "ojs/ojlabel";

import { h } from "preact";
import { useEffect } from 'preact/hooks';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  getHeaderAsync, selectContainerHeader
} from './containerHeader-slice';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #24246a;
`;

export function ContainerHeader() {
  const containerHeader = useAppSelector(selectContainerHeader);
  const dispatch = useAppDispatch();

  useEffect(() => { 
    dispatch(getHeaderAsync())
  }, []);
  
  return (
    <div>
      <Title>{containerHeader}</Title>
      
    </div>
  );
}

export default ContainerHeader;