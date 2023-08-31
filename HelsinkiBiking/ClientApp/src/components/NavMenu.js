import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink as StrapNavLink } from 'reactstrap';
import { NavLink as RouterNavLink, Link } from 'react-router-dom';
import './NavMenu.css';
import BikeLogo from './images/logos/bikeLogo.png';

//Q: why is this causing activeClassName error


// write function called calculate date
const NavLinkComponent = ({ to, children, isActive, exact, ...rest }) => {
    // No need to destructure activeClassName from rest because we're not using it explicitly.
    // Rest will collect all other props that are not to, children, or exact.

    return (
        <RouterNavLink
            to={to}
            exact={exact}
            className={isActive ? 'current-nav-link' : ''}
            {...rest} // This should be safe as long as NavLinkComponent only receives props relevant to RouterNavLink.
        >
            {children}
        </RouterNavLink>
    );
}




export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

    render() {
        console.log("__filename:", __filename);
        console.log("import.meta.url:", import.meta.url);

     return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                    <NavbarBrand tag={Link} to="/">
                        <img src={BikeLogo} className="bike-logo" alt="Bike Logo" />
                        HelsinkiBiking
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <StrapNavLink tag={NavLinkComponent} to="/">Home</StrapNavLink>
                            </NavItem>
                            <NavItem>
                                <StrapNavLink tag={NavLinkComponent}  to="/JourneyList">JourneyList</StrapNavLink>
                            </NavItem>
                            <NavItem>
                                <StrapNavLink tag={NavLinkComponent} to="/StationList">StationList</StrapNavLink>
                            </NavItem>
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    
  }
}
