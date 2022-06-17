import React from 'react';
import { Link } from 'react-router-dom';
import LiquorIcon from '@mui/icons-material/Liquor';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Swal from 'sweetalert2';
import '../styles/BottomMenu.css';

function BottomMenu() {
  const notCompletedClick = () => {
    Swal.fire({
      title: 'Calma!',
      text: 'Esta página ainda não foi implementada 😒 Clique em outra!',
      icon: 'warning',
      confirmButtonText: 'Ok!',
      confirmButtonColor: '#fbb03b',
    });
  };

  return (
    <footer data-testid="footer" className="BottomMenu">
      <Link to="/drinks" data-testid="drinks-bottom-btn">
        <LiquorIcon color="primary" fontSize="large" />
      </Link>
      {/* <Link to="/explore" data-testid="explore-bottom-btn"> */}
      <TravelExploreIcon color="primary" fontSize="large" onClick={ notCompletedClick } />
      {/* </Link> */}
      <Link to="/foods" data-testid="food-bottom-btn">
        <LocalDiningIcon color="primary" fontSize="large" />
      </Link>
    </footer>
  );
}

export default BottomMenu;
