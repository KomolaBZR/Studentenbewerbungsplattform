import React, { Component } from 'react'
import '../../layout/css/starter-template.css';

class NotFound extends Component {
    render() {
        return (
            <div>
                <main role="main" className="container">
                    <div className="starter-template">
                        <h1>404!</h1>
                        <h2>File Not Found</h2>
                    </div>
                </main>
            </div>
        )
    }
}

export default NotFound;