import React from 'react';

export default function Footer(props) {
    const {
        children,
    } = props;
    return (
        <footer>
            {children}
        </footer>
    )
}