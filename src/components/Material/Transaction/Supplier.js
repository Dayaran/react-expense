import React from 'react';

const Material = props => {
    return (
        <li>
            <div>{props.date}</div>
            <div>{props.name}</div>
            <div>{props.method}</div>
            <div>{props.type}</div>
            <div>{props.qty}</div>
        </li>
    );
}

export default Material;