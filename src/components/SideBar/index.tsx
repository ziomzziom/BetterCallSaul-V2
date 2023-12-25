import React from 'react';
import styled from 'styled-components';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Switch from '@mui/material/Switch';
import { toggleThemeMode } from '../../store/actions';
import { connect } from 'react-redux';
import SidebarList from './SidebarList';
import JustjoinLogo from '../shared/JustjoinLogo';
import Head from './sidebarHeading'; 
import InitialStoreState from '../../types/InitialStoreState';


const SideBar = ({ darkMode, toggleThemeMode }: { darkMode?: boolean; toggleThemeMode: VoidFunction }) => (
  <Container>
    <Head onClickButton={() => { /* Add the logic */ }} />
    <SidebarList />
    <ToggleWrapper>
      <WbSunnyIcon />
      <Switch
        checked={darkMode}
        onChange={toggleThemeMode}
        color='default'
        inputProps={{
          'aria-label': 'checkbox with default color',
        }}
      />
      <NightsStayIcon />
    </ToggleWrapper>
  </Container>
);

const Container = styled.div`
  min-width: 300px;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ToggleWrapper = styled.div`
	display: flex;
	align-items: center;
  justify-content: center;
	color: rgba(0, 0, 0, 0.54);
`;

const mapStateToProps = ({ darkMode }: InitialStoreState) => ({
  darkMode,
});

export default connect(mapStateToProps, { toggleThemeMode })(SideBar);
