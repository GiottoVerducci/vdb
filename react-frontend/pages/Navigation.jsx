import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import PersonFill from '../assets/images/icons/person-fill.svg';
import InfoCircleFill from '../assets/images/icons/info-circle-fill.svg';
import ToggleOn from '../assets/images/icons/toggle-on.svg';
import ToggleOff from '../assets/images/icons/toggle-off.svg';

function Navigation(props) {
  const NavBar = ({ location }) => {
    return (
      <Navbar sticky="top" bg="dark" variant="dark">
        <Nav className="container justify-content-between">
          <div className="d-flex align-items-center pr-1">

            {props.username &&
             !props.isMobile &&
             (props.location.pathname == '/decks' ||
              props.location.pathname == '/crypt' ||
              props.location.pathname == '/library') && (
                <div
                  className="d-flex align-items-center pl-1 pr-4"
                  onClick={() => props.setInventoryMode(!props.inventoryMode)}
                >
                  <div
                    className={
                      props.inventoryMode
                        ? 'd-flex white-font-toggle'
                        : 'd-flex gray-font-toggle'
                    }
                  >
                    {props.inventoryMode ? (
                      <ToggleOn viewBox="0 0 16 16" />
                    ) : (
                      <ToggleOff viewBox="0 0 16 16" />
                    )}
                  </div>
                  <div
                    className={
                      props.inventoryMode
                        ? 'd-inline pl-1 white-font'
                        : 'd-inline pl-1 gray-font'
                    }
                  >
                    Inventory Mode
                  </div>
                </div>
              )
            }
            {props.username &&
             !props.isMobile &&
             ((props.location.pathname == '/crypt' &&
               !props.showCryptSearch) ||
              (props.location.pathname == '/library' &&
               !props.showLibrarySearch)) && (
                 <div
                   className="d-flex align-items-center pl-1 pr-4"
                   onClick={() => props.setAddMode(!props.addMode)}
                 >
                   <div
                     className={
                       props.addMode
                         ? 'd-flex white-font-toggle'
                         : 'd-flex gray-font-toggle'
                     }
                   >
                     {props.addMode ? (
                       <ToggleOn viewBox="0 0 16 16" />
                     ) : (
                       <ToggleOff viewBox="0 0 16 16" />
                     )}
                   </div>
                   <div
                     className={
                       props.addMode
                         ? 'd-inline pl-1 white-font'
                         : 'd-inline pl-1 gray-font'
                     }
                   >
                     Add-to-Deck Mode
                   </div>
                 </div>
               )}
          </div>

          <div className="d-flex align-items-center">
            <NavLink to="/account" className="nav-link pr-2 pl-1">
              {props.username ? <PersonFill /> : 'Login'}
            </NavLink>
            <NavLink to="/about" className="nav-link pr-2 pl-1">
              {props.isMobile ? <InfoCircleFill /> : 'About'}
            </NavLink>
            <NavLink to="/twd" className="nav-link pr-2 pl-1">
              TWD
            </NavLink>
            <NavLink to="/inventory" className="nav-link pr-2 pl-1">
              Inventory
            </NavLink>
            <NavLink to="/decks" className="nav-link pr-2 pl-1">
              Decks
            </NavLink>
            <NavLink to="/crypt" className="nav-link pr-2 pl-1">
              Crypt
            </NavLink>
            <NavLink to="/library" className="nav-link pr-2 pl-1">
              Library
            </NavLink>
          </div>
        </Nav>
      </Navbar>
    );
  };

  return <NavBar />;
}

export default withRouter(Navigation);
