import React from 'react';
import './footer.css'


const Footer = () => {

    return (
        <footer>
          <div className='footer-container'>
              <span>Adzinets Katsiaryna</span>
              <a href='https://github.com/adzinetskatsiaryna?tab=repositories'className='link-gh-pages' target="_blank"></a>
              <a href='https://rs.school/' className='link-rss' target="_blank"></a>  
          </div>
        </footer>
        
    )
};

export default Footer