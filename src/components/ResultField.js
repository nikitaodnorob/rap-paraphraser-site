import React from 'react';
import classNames from 'classnames';
import './css/ResultField.css';

export const ResultField = (props) => {
    const {text = '', baseClass = '', isLoading = false} = props;
    const classes = classNames({
        [baseClass]: true,
        'result': true,
        'loading': isLoading,
    });
    return (
        <div className={classes}>{text}</div>
    );
};
