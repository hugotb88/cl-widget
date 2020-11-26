import React from 'react';
import './styles.css';

const WclLoader = () => (
    <div className = "wclLoader">
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

export default WclLoader;