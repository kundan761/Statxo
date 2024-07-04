import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Home</Link>
        <div className="navbar-links">
          <Link to="/form" className="navbar-link">Add Record</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
