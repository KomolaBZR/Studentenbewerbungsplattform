import React from 'react';
import '../../layout/css/sticky-footer.css';

function Footer() {
    const linkStyle = { color: '#ced4da' };

    return (
        <div className="container">
            <p>
                Cover template for <a href="https://getbootstrap.com/" style={linkStyle}>Bootstrap</a>, by{' '}
                <a href="https://twitter.com/mdo" style={linkStyle}>@mdo</a>.
            </p>
        </div>
    );
}

export default Footer;