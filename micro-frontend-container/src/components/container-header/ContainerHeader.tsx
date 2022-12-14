import "ojs/ojbutton";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojknockout";
import "ojs/ojlabel";

import { h } from "preact";
import { useEffect, useRef } from 'preact/hooks';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { App1Props } from '../.././../../micro-frontend-shared/src/typing';

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

  const ref = useRef()

  useEffect(() => {
    dispatch(getHeaderAsync());

  }, []);


  useEffect(() => {

    if (!ref.current) {
      return
    }

    // remote
    const mountRemote = async (el: Element) => {
      // @ts-ignore
      const remoteJetPreactBootstrap = import('remoteJetPreact/remoteJetPreactBootstrap');

      const bootstrapRemote = await remoteJetPreactBootstrap;

      const app1Props: App1Props = {
        appName: 'app1',
        appRouterRoot: '/page1'
      };
      
      bootstrapRemote.mount(el, app1Props)
    };


    mountRemote(ref.current);


  }, [ref]);

  return (
    <div>
      <Title>{containerHeader}</Title>
      <div ref={ref}></div>
    </div>
  );
}

export default ContainerHeader;