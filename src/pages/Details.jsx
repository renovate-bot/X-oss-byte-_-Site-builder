import { useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { FiExternalLink } from "react-icons/fi";

const Details = () => {
    const [operationData, setOperationData] = useState({ message: "Operation in progress" });

    const KinstaAPIUrl = 'https://api.kinsta.com/v2';
    const stateData = JSON.parse(localStorage.getItem('state'));

    const checkOperation = async () => {
        const operationId = stateData.operationId;
        const resp = await fetch(
            `${KinstaAPIUrl}/operations/${operationId}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_KINSTA_API_KEY}`
                }
            }
        );

        const data = await resp.json();
        setOperationData(data);
    }

    if (stateData) {
        setTimeout(checkOperation, 5 * 60 * 1000);
    }

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
                        <p>{operationData.message}..</p>
                        <button className='sm-btn' onClick={() => checkOperation()}>Check Site Status</button>
                    </div>
                </div>

                <div className="services">
                    <p className="description">If message above indicates that "Operation has successfully finished", use the links below to access your WP admin and the site itself.</p>
                    <div className="details">
                        <a href={`http://${stateData.site_name}.kinsta.cloud/wp-admin/`} target="_blank" rel="noreferrer" className='detail-link'>
                            <p>Open WordPress admin</p>
                            <FiExternalLink />
                        </a>
                        <a href={`http://${stateData.site_name}.kinsta.cloud/`} target="_blank" rel="noreferrer" className='detail-link'>
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