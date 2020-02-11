import React from 'react';

export default function Header(props) {
    const {
        current,
        topics,
        children
    } = props;
    return (
        <header>
            <h1>{children}</h1>
            <ul>
                {
                    topics.map((topic, index) => {
                        return <li>{topic}</li>
                    })
                }
            </ul>
        </header>
    )
}