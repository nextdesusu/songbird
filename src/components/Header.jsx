import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export default function Header(props) {
    const {
        current,
        topics,
        score,
        children
    } = props;
    return (
        <header>
            <h1>{children}</h1>
            <h2>score: {score}</h2>
            <Tabs>
                {
                    topics.map((topic, index) => {
                        const topicName = topic.charAt(0).toUpperCase() + topic.slice(1);
                        return (
                            <Tab
                                key={index}
                                title={topicName}
                                disabled={current !== index}
                            >   
                            </Tab>
                        )
                    })
                }
            </Tabs>
        </header>
    )
}