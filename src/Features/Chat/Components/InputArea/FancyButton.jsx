import React from 'react';

import './FancyButton.css';

export default function FancyButton({ createMessage }) {
    return (
        <button className="text-button" onClick={createMessage}>
            Send
        </button>
    );
}
