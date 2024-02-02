import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./navbar.css"
import NetflixLogo from '../../assets/netflix-3.svg'
import useWindowSize from '../../utilities/hooks/useWindowSize';
import routes from '../../utilities/routes';
import Search from '../search/search';

function Navbar({ selectedProfile }) {
    let arrOptions = [{ id: 1, title: "Home" }, { id: 2, title: "Movies" }, { id: 3, title: "TV Shows" }, { id: 4, title: "News & Popular" }, { id: 5, title: "My List" }, { id: 6, title: "Browse by Language" }];
    const navigate = useNavigate();
    const screenSize = useWindowSize();
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navigateToProfile = () => {
        navigate(routes.profile)
    }

    return (
        <div className={`container-navbar ${offset > 30 && `after-scroll`}`}>
            <div className='inner-container'>
                <img className='netflix-logo' src={NetflixLogo} />
                {screenSize.width > 640 ?
                    arrOptions.map((element, index) => <h5 className="links" style={{ paddingLeft: 16, color: index == 0 ? 'white' : '#B6B5B6' }}>{element.title}</h5>)
                    : null}
            </div>

            <div className='inner-container'>
                <div className="search-bar"><Search /></div>
                <h5 style={{ paddingLeft: 16, color: '#fff' }}>{selectedProfile.title}</h5>
                <div style={{ color: '#fff', fontSize: 20, paddingLeft: 16 }} ><i className="fa fa-bell" ></i></div>
                <img onClick={navigateToProfile} width={40} style={{ objectFit: 'contain', borderRadius: 6, marginLeft: 16 }} src={selectedProfile.asset} />
                <div style={{ color: '#fff', fontSize: 20, paddingLeft: 16 }} ><i className="fa fa-caret-down" ></i></div>
            </div>

        </div>
    )
}

export default Navbar