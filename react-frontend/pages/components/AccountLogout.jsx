import React from 'react';
import { Button } from 'react-bootstrap';
import DoorClosedFill from '../../assets/images/icons/door-closed-fill.svg';

function AccountLogout(props) {
  const logoutUser = () => {
    const url = `${process.env.API_URL}logout`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };
    fetch(url, options);

    props.setUsername(undefined);
  };

  return (
    <Button variant="outline-secondary" onClick={logoutUser}>
      <DoorClosedFill /> Logout
    </Button>
  );
}

export default AccountLogout;
