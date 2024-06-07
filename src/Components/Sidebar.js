import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar() {
  const [showNav, setShowNav] = useState(window.innerWidth > 1600);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setShowNav(window.innerWidth > 1600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1600) {
      setShowNav(false); // Hide sidebar on route change for mobile
    }
  }, [location]);

  const handleToggle = () => {
    setShowNav(prevShowNav => !prevShowNav);
  };

  const styles = {
    bodyArea: {
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#343a40',
      color: '#fff',
      transition: 'all 0.3s',
    },
    headerToggle: {
      fontSize: '24px',
      cursor: 'pointer',
    },
    headerImg: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
    },
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      backgroundColor: '#343a40',
      padding: '20px 10px',
      transition: 'transform 0.3s ease-in-out, width 0.3s',
      transform: showNav ? 'translateX(0)' : 'translateX(-100%)',
      zIndex: 1000,
      overflowY: 'auto',
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      margin: '10px 0',
      color: '#fff',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
    },
    navLinkHover: {
      backgroundColor: '#495057',
    },
    navIcon: {
      fontSize: '20px',
      marginRight: '10px',
    },
    navLogo: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      margin: '10px 0',
      color: '#fff',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
    },
    navLogoIcon: {
      fontSize: '20px',
      marginRight: '10px',
    },
    navLogoName: {
      fontSize: '20px',
    },
    '@media (max-width: 1600px)': {
      navbar: {
        width: '220px',
      },
      navLogoName: {
        fontSize: '18px',
      },
      navIcon: {
        fontSize: '18px',
      },
    },
    '@media (max-width: 1200px)': {
      navbar: {
        width: '200px',
      },
      navLogoName: {
        fontSize: '16px',
      },
      navIcon: {
        fontSize: '16px',
      },
    },
    '@media (max-width: 992px)': {
      navbar: {
        width: '180px',
      },
      header: {
        padding: '10px',
      },
      navLogoName: {
        fontSize: '16px',
      },
      navIcon: {
        fontSize: '16px',
      },
    },
    '@media (max-width: 768px)': {
      navbar: {
        width: '150px',
      },
      navLogoName: {
        fontSize: '14px',
      },
      navIcon: {
        fontSize: '14px',
      },
      header: {
        flexDirection: 'column',
        textAlign: 'center',
      },
      headerToggle: {
        fontSize: '20px',
      },
    },
    '@media (max-width: 576px)': {
      navbar: {
        width: '100%',
        transform: showNav ? 'translateX(0)' : 'translateX(-100%)',
      },
      navLink: {
        padding: '8px',
      },
      navIcon: {
        fontSize: '14px',
      },
      navLogoName: {
        fontSize: '14px',
      },
    },
  };

  return (
    <div style={styles.bodyArea}>
      <header style={styles.header}>
        <div
          style={styles.headerToggle}
          onClick={handleToggle}
        >
          <i className={`bi ${showNav ? 'bi-x' : 'bi-list'}`} />
        </div>
        <div>
          <img
            src="https://reqres.in/img/faces/5-image.jpg"
            alt="User"
            style={styles.headerImg}
          />
        </div>
      </header>
      <div style={styles.navbar}>
        <nav style={styles.nav}>
          <div>
            <Link to="/calculate" style={styles.navLogo}>
              <i className='bi bi-alexa' style={styles.navLogoIcon} /> <span style={styles.navLogoName}>Menu</span>
            </Link>
            <div>
              <Link to="/class" style={styles.navLink}>
                <i className='bi bi-people' style={styles.navIcon} /><span>Class</span>
              </Link>
              <Link to="/horse" style={styles.navLink}>
                <i className='bi bi-person-check' style={styles.navIcon} /><span>Horse</span>
              </Link>
              <Link to="/jockey" style={styles.navLink}>
                <i className='bi bi-people' style={styles.navIcon} /><span>Jockey</span>
              </Link>
              <Link to="/feeddata" style={styles.navLink}>
                <i className='bi bi-person-check' style={styles.navIcon} /><span>Feed Data</span>
              </Link>
              <Link to="/calculate" style={styles.navLink}>
                <i className='bi bi-people' style={styles.navIcon} /><span>Calculate</span>
              </Link>
              <Link to="/detail" style={styles.navLink}>
                <i className='bi bi-box-arrow-left' style={styles.navIcon} /><span>Details</span>
              </Link>
            </div>
            <Link to="/changepassword" style={styles.navLink}>
              <i className='bi bi-key' style={styles.navIcon} /><span>Change Password</span>
            </Link>
            <Link to="/signout" style={styles.navLink}>
              <i className='bi bi-box-arrow-left' style={styles.navIcon} /><span>Sign Out</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
