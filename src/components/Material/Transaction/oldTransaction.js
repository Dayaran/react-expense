import React from 'react';

const Material = props => {
    return (
        <li>
            <div>{props.date}</div>
            <div>{props.name}</div>
            <div>{props.method}</div>
            <div>{props.rate}</div>
            <div>{props.type === 'deposit' ? (
                <span className="deposit"> +{props.rate} </span>
            ) : (
                <span className="expense">
                    -{props.rate}
                </span>
            )}</div>
        </li>
    );
}

export default Material;