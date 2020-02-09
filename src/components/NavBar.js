import React from 'react';
import { Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return 
    <Fragment>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Stock Simulation Web</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Buy</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Sell</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
                </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                  </DropdownItem>
                <DropdownItem>
                  Option 2
                  </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                  </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Label>
              <h4>&nbsp;Login&nbsp;</h4>
            </Label>
            <Form>
              <FormGroup>
                <Input type="id" name="id" id="id" placeholder="ID"></Input>
              </FormGroup>
            </Form>
            <p>&nbsp;</p>
            <Form>
            <FormGroup>
                <Input type="password" name="password" id="password" placeholder="password"></Input>
              </FormGroup>
            </Form>
          </Nav>
        </Collapse>
      </Navbar>
    </Fragment>
  }
}