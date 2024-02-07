import React, { useEffect, useState } from 'react'
import Cover from '../../components/cover'
import Navbar from '../../components/navbar'
import TilesRow from '../../components/tilesrow'
import requests from '../../services/requests'

export default function HomePage() {

  const [selectedProfile, setSelectedProfile] = useState({})

  useEffect(() => {

    async function getSelectedProfile() {
      // retreiving selectedProfile to highlight profile icon in navbar
      const selectedProfile = await localStorage.getItem('selectedProfile');
      setSelectedProfile(JSON.parse(selectedProfile));
    };
    getSelectedProfile();

  }, [])
  return (
    <div className='container-main-page'>

      {/* navbar */}
      <Navbar selectedProfile={selectedProfile} />

      {/* cover */}
      <Cover />

      {/* resuable component tile */}
      <div style={{ paddingTop: 16, }}>

        {/* Rest of the tiles */}
        <TilesRow title="Top Rated" requestUrl={requests.fetchTopRated} />
        <TilesRow title="Popular Now" requestUrl={requests.fetchPopular} />
        <TilesRow title="Comedies" requestUrl={requests.fetchComedy} />
        <TilesRow title="Action Movies" requestUrl={requests.fetchAction} />
        <TilesRow title="Thriller Movies" requestUrl={requests.fetchDocumentaries} />
        <TilesRow title="Horror Movies" requestUrl={requests.fetchHorror} />
        <TilesRow title="TV Shows" requestUrl={requests.fetchTVShows} />
      </div>
    </div>
  )
}
