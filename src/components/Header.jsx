import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Link to="/">
            <img src="./../kinsta-logo.png" alt="Kinsta Logo" className="kinsta-logo" />
        </Link>
    )
}

export default Header