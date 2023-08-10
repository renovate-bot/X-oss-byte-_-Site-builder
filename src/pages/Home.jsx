import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    const siteNameRef = useRef(null);
    const displayNameRef = useRef(null);
    const wpEmailRef = useRef(null);

    const navigate = useNavigate();

    let [siteName, setSiteName] = useState('');
    let [displayName, setDisplayName] = useState('');
    let [wpAdminUsername, setWpAdminUsername] = useState('');
    let [wpAdminEmail, setWpAdminEmail] = useState('');
    let [wpAdminPassword, setWpAdminPassword] = useState('');
    let [centerLocation, setCenterLocation] = useState('');
    let [installWooCommerce, setInstallWooCommerce] = useState(false);
    let [installYoast, setInstallYoast] = useState(false);

    const KinstaAPIUrl = 'https://api.kinsta.com/v2';

    const createSite = (e) => {
        e.preventDefault();

        checkSiteName();
        checkDisplayName();
        checkWpAdminEmail();

        if (siteName.length > 4 && displayName.length > 4 && wpAdminUsername !== "" && wpAdminEmail !== "" && wpAdminPassword !== "" && centerLocation !== "") {
            localStorage.clear();
            const createSiteWithKinstaAPI = async () => {
                const resp = await fetch(
                    `${KinstaAPIUrl}/sites`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${process.env.REACT_APP_KINSTA_API_KEY}`
                        },
                        body: JSON.stringify({
                            company: `${process.env.REACT_APP_KINSTA_COMPANY_ID}`,
                            display_name: displayName,
                            region: centerLocation,
                            install_mode: 'new',
                            is_subdomain_multisite: false,
                            admin_email: wpAdminEmail,
                            admin_password: wpAdminPassword,
                            admin_user: wpAdminUsername,
                            is_multisite: false,
                            site_title: siteName,
                            woocommerce: false,
                            wordpressseo: false,
                            wp_language: 'en_US'
                        })
                    }
                );

                const data = await resp.json();
                let newData = { operationId: data.operation_id, site_name: displayName };
                localStorage.setItem('state', JSON.stringify(newData));
                navigate('/details');
            }

            createSiteWithKinstaAPI();

            setSiteName('');
            setDisplayName('');
            setWpAdminEmail('');
            setWpAdminPassword('');
            setInstallWooCommerce(false);
            setWpAdminUsername('');
            setCenterLocation('');
            setInstallYoast(false);
        }
    }

    const checkSiteName = () => {
        if (siteName.length < 4) {
            siteNameRef.current.style.display = 'block';
        } else {
            siteNameRef.current.style.display = 'none';
        }
    }

    const checkDisplayName = () => {
        if (displayName.length < 4) {
            displayNameRef.current.style.display = 'block';
        } else {
            displayNameRef.current.style.display = 'none';
        }
    }

    const checkWpAdminEmail = () => {
        let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!wpAdminEmail.match(regex)) {
            wpEmailRef.current.style.display = 'block';
        } else {
            wpEmailRef.current.style.display = 'none';
        }
    }

    return (
        <div className="app-container">
            <Header />
            <div className="container">
                <div className="container-title">
                    <h1 className="title">Site Builder with Kinsta API</h1>
                    <p className="description">
                        This is a React app that uses the Kinsta API to create WordPress sites, without needing to access MyKinsta dashboard.
                    </p>
                </div>
                <form onSubmit={createSite}>
                    <div className="form-container">
                        <div className="input-div">
                            <label htmlFor="siteName">Site name</label>
                            <span>Helps you identify your site. Only used in MyKinsta</span>
                            <input type="text" className="form-control" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                            <span className='error-message' ref={siteNameRef}>Ensure this has more than 4 characters</span>
                        </div>
                        <div className="input-div">
                            <label>Display name</label>
                            <input type="text" className="form-control" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                            <span className='error-message' ref={displayNameRef}>Ensure this has more than 4 characters</span>
                        </div>
                        <div className="input-flex">
                            <div className="input-div">
                                <label>WordPress admin username</label>
                                <input type="text" className="form-control" value={wpAdminUsername} onChange={(e) => setWpAdminUsername(e.target.value)} />
                            </div>
                            <div className="input-div">
                                <label>WordPress admin email</label>
                                <input type="email" className="form-control" value={wpAdminEmail} onChange={(e) => setWpAdminEmail(e.target.value)} />
                                <span className='error-message' ref={wpEmailRef}>Ensure this is a valid email</span>
                            </div>
                        </div>
                        <div className="input-div">
                            <label>WordPress admin password</label>
                            <span>Ensure you rember this password as it is what you'll use to log into WP-admin</span>
                            <input type="text" className="form-control" value={wpAdminPassword} onChange={(e) => setWpAdminPassword(e.target.value)} />
                        </div>
                        <div className="input-div">
                            <label>Data center location</label>
                            <span>Allows you to place your website in a geographical location closest to your visitors.</span>
                            <select className="form-control" value={centerLocation} onChange={(e) => setCenterLocation(e.target.value)}>
                                <option value=""></option>
                                <option value="asia-east1">Changhua County, Taiwan</option>
                                <option value="asia-east2">Hong Kong</option>
                                <option value="asia-northeast1">Tokyo, Japan</option>
                                <option value="asia-northeast2">Osaka, Japan</option>
                                <option value="asia-northeast3">Seoul, South Korea</option>
                                <option value="asia-south1">Mumbai, India</option>
                                <option value="asia-south2">Delhi, India</option>
                                <option value="asia-southeast1">Jurong West, Singapore</option>
                                <option value="asia-southeast2">Jakarta, Indonesia</option>
                                <option value="australia-southeast1">Sydney, Australia</option>
                                <option value="australia-southeast2">Melbourne, Australia</option>
                                <option value="europe-central2">Warsaw, Poland</option>
                                <option value="europe-north1">Hamina, Finland</option>
                                <option value="europe-southwest1">Madrid, Spain</option>
                                <option value="europe-west1">St. Ghislain, Belgium</option>
                                <option value="europe-west2">London, United Kingdom</option>
                                <option value="europe-west3">Frankfurt, Germany</option>
                                <option value="europe-west4">Eemshaven, Netherlands</option>
                                <option value="europe-west6">Zurich, Switzerland</option>
                                <option value="europe-west8">Milan, Italy</option>
                                <option value="europe-west9">Paris, France</option>
                                <option value="me-west1">Tel Aviv, Israel</option>
                                <option value="northamerica-northeast1">Montréal, Canada</option>
                                <option value="northamerica-northeast2">Toronto, Canada</option>
                                <option value="southamerica-east1">São Paulo, Brazil</option>
                                <option value="southamerica-west1">Santiago, Chile</option>
                                <option value="us-central1">Council Bluffs, Iowa, USA</option>
                                <option value="us-east1">Moncks Corner, South Carolina, USA</option>
                                <option value="us-east4">Ashburn, Virginia, USA</option>
                                <option value="us-east5">Columbus, Ohio, USA</option>
                                <option value="us-south1">Dallas, Texas, USA</option>
                                <option value="us-west1">The Dalles, Oregon, USA</option>
                                <option value="us-west2">Los Angeles, California, USA</option>
                                <option value="us-west3">Salt Lake City, Utah, USA</option>
                                <option value="us-west4">Las Vegas, Nevada, USA</option>
                            </select>
                        </div>
                        <div className="checkbox-flex">
                            <div className="checkbox-input">
                                <input type="checkbox" checked={installWooCommerce} onChange={() => setInstallWooCommerce(!installWooCommerce)} />
                                <label>Install WooCommerce</label>
                            </div>
                            <div className="checkbox-input">
                                <input type="checkbox" checked={installYoast} onChange={() => setInstallYoast(!installYoast)} />
                                <label>Install Yoast SEO</label>
                            </div>
                        </div>
                        <button className='btn'>Create Site</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div >
    )
}

export default Home