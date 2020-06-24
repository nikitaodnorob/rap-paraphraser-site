import React from 'react';
import classNames from 'classnames';

export const ResultField = (props) => {
    const {text = '', baseClass = '', isLoading = false} = props;
    const classes = classNames({
        [baseClass]: true,
        'loading': isLoading,
    });
    return (
        <div id="result" className={classes}>{text}</div>
    );
};
