import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const Login = ({ setIsAdmin }) => {
    const navigate = useNavigate();

    const handleLoginUser = () => {
        setIsAdmin(false);
        navigate('/table');
    };

    const handleLoginAdmin = () => {
        setIsAdmin(true);
        navigate('/table');
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">Select Your Role</h2>
            <div className="button-group">
                <button className="login-button" onClick={handleLoginUser}>Login as User</button>
                <button className="login-button" onClick={handleLoginAdmin}>Login as Admin</button>
            </div>
        </div>
    );
};

Login.propTypes = {
    setIsAdmin: PropTypes.func.isRequired,
};

export default Login;
