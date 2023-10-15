import { useEffect, useState } from 'react';
import catNames from 'cat-names';
import { fetchShibeApiImages } from '../api/shibeapi';
import { fetchCatApiImages } from '../api/catapi';
import { fetchNekoApiImages } from '../api/nekos';
import { fetchAnimalityApiImages } from '../api/animality';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings'; // Add this import


const CatFeed = () => {
  const [catImages, setCatImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showResetButton, setShowResetButton] = useState(false); // Step 2

  const fetchImages = async () => {
    const cookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)api_val\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    // Choose the API function based on the cookie value
    let fetchfunc;
    switch (cookieValue) {
      case 'shibe':
        fetchfunc = fetchShibeApiImages;
        break;
      case 'animality':
        fetchfunc = fetchAnimalityApiImages;
        break;
      default:
        fetchfunc = fetchCatApiImages; // Default to TheCatAPI
    }

    try {
      const data = await fetchfunc();
      setCatImages((prevImages) => [...prevImages, ...data]);
      setPage(1);
      setShowResetButton(true);
    } catch (error) {
      console.error('Error fetching cat images:', error);
    }
  };

  const resetCatImages = () => {
    setCatImages([]);
    setShowResetButton(false);
    fetchImages(); // Fetch new cat images based on the cookie
  };

  useEffect(() => {
    fetchImages(); // Fetch images when the component mounts
  }, []);

  const feedItemStyle = {
    backgroundColor: '#ECEFF1', // A Material Design background color
    border: '1px solid #ddd',
    borderRadius: '8px',
    margin: '20px auto',
    maxWidth: '600px',
    padding: '20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  };
  

  const imageStyle = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '8px',
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const userAvatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  };

  const redirectToSettings = () => {
    window.location = '/' + 'settings';
   };


  return (
    <div className="cat-feed">
      {catImages.map((catImageUrl, index) => (
        <div key={index} style={feedItemStyle}>
          <div style={userInfoStyle}>
            <img
              src="https://i.pinimg.com/564x/1a/c0/23/1ac0231aa6d74d092328d445aa98183e.jpg"
              alt="User Avatar"
              style={userAvatarStyle}
            />
            <span>{catNames.random()}</span>
          </div>
          <img src={catImageUrl} alt={`Cat ${index}`} style={imageStyle} />
        </div>
      ))}
      {showResetButton && (
        <>
          <IconButton className="reset-button" onClick={resetCatImages}>
            <RefreshIcon />
          </IconButton>
          <IconButton className="settings-button" onClick={redirectToSettings}>
            <SettingsIcon />
          </IconButton>
        </>
      )}
    </div>
  );
}

export default CatFeed;
