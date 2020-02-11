import React from 'react';
import Card from 'react-bootstrap/Card';

export default function AnswerTemplate(props) {
    const {
        name,
        text,
        imageSrc,
        children,
    } = props;
    return (
        <Card style={{height: '100%'}}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                {text && <Card.Text>{text}</Card.Text>}
                {
                    children
                }
            </Card.Body>
            {imageSrc && <Card.Img variant='bottom' src={imageSrc} />}
        </Card>
    )
}