import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import './App.scss';
import Definition from './Definition/Definition';
import ActualSituation from './ActualSituation/ActualSituation'

const App = () => {

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div className="App">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={{ active: activeTab === '1' }}
            onClick={() => { toggle('1'); }}
          >
            ¿Qué es?
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={{ active: activeTab === '2' }}
            onClick={() => { toggle('2'); }}
          >
            Situación Actual
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Definition />
        </TabPane>
        <TabPane tabId="2">
          <ActualSituation />
        </TabPane>
      </TabContent>
    </div>
  );
}

export default App;
