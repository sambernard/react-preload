import React from 'react';

export default function Spinner() {
    return (
            <span
                className="glyphicon glyphicon-refresh gly-ani"
                style={{
                    fontSize: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
            />
        )
}
