import React from 'react';
var _ = require('lodash');

export const Star = (props) => {

    //const numberOfStars = 1 + Math.floor(Math.random() * 9);
    

    return (
        <div className="col-md-5">
            {_.range(props.numberOfStars).map((number, i) =>
                <i key={number} className="fa fa-star"></i>
            )}
        </div>
    )
}