import Header from '../components/Header';
import Footer from '../components/Footer';

import { FiExternalLink } from "react-icons/fi";

const Details = () => {

    return (
        <div className="app-container">
            <Header />
            <div className="container">
                <div className="container-title">
                    <h1 className="title">Site Builder with Kinsta API</h1>
                    <p>
                        Your site is building. It takes minutes to build. Feel free to reload this page to see current updates of your site operation.
                    </p>
                </div>
                <div className="services">
                    <div className="details">
                        <p>Operation status..</p>
                        <button className='sm-btn'>Check Site Status</button>
                    </div>
                </div>

                <div className="services">
                    <p className="description">If message above indicates that "Operation has successfully finished", use the links below to access your WP admin and the site itself.</p>
                    <div className="details">
                        <a href={`http://siteName.kinsta.cloud/wp-admin/`} target="_blank" rel="noreferrer" className='detail-link'>
                            <p>Open WordPress admin</p>
                            <FiExternalLink />
                        </a>
                        <a href={`http://siteName.kinsta.cloud/`} target="_blank" rel="noreferrer" className='detail-link'>
                            <p>Open URL</p>
                            <FiExternalLink />
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Details