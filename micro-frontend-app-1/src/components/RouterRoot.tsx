/**
 * 
 * @author Paul Lan<lanshunfang#gmail.com>
 */

import "ojs/ojdrawerlayout";
import "ojs/ojnavigationlist";

import { h } from "preact";
import styled from 'styled-components';

import { useCallback } from "preact/compat";
import { useState } from 'preact/hooks';

import { NavLink, Outlet } from "react-router-dom";
import { ROUTE_ABS } from "./router";


const ComponentWrapper = styled.div`
 .demo-padding {
    margin: 10px;
 }
`;



const ContentWrapper = styled.div`

`;



const NavListWrapper = styled.div`
  padding: 10px;
  margin: 10px;
`;


export default function RouterRoot() {
    const [startOpened, setStartOpened] = useState(false);
    const [tabName, setTabName] = useState<'counter' | 'demo-2'>('counter');

    const startToggle = useCallback(() => {
        setStartOpened(!startOpened);
    }, [startOpened]);


    return (
        <div class="oj-web-applayout-max-width oj-web-applayout-content">

            <ComponentWrapper>
                <oj-drawer-layout start-opened={startOpened} class="demo-full-height">
                    <div class="demo-padding">
                        <div class="demo-controls">
                            <oj-button id="buttonOpener" display="icons" onojAction={startToggle}>
                                <span slot="startIcon" class="oj-ux-ico-menu"></span>
                                Start
                            </oj-button>
                        </div>
                        <h6>Pick an item from the menu </h6>
                        <ContentWrapper>
                            <Outlet />
                        </ContentWrapper>

                    </div>

                    <NavListWrapper slot="start" class="demo-drawer-start" id="demo-drawer-start">
                        <div class="demo-drawer-header">
                            <div>
                                <h6>Welcome</h6>
                            </div>
                            <oj-button
                                id="buttonCloser"
                                display="icons"
                                chroming="borderless"
                                onojAction={startToggle}>
                                <span slot="startIcon" class="oj-ux-ico-close"></span>
                                Close
                            </oj-button>
                        </div>
                        <oj-navigation-list>
                            <ul>
                                {
                                    Object.entries(ROUTE_ABS)
                                        .filter(entry => !entry[1].isRoot)
                                        .map(entry => <NavLink
                                            key={entry[0]}
                                            to={entry[1].path}
                                            className={({ isActive, isPending }) =>
                                                isActive
                                                    ? "oj-selected"
                                                    : isPending
                                                        ? "oj-disabled"
                                                        : ""
                                            }
                                        >{entry[0]}</NavLink>)
                                }
                            </ul>
                        </oj-navigation-list>
                    </NavListWrapper>
                </oj-drawer-layout>
            </ComponentWrapper>

        </div>

    );
}