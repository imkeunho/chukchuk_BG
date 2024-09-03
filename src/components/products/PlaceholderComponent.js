import React from 'react';
import {Card, Placeholder} from "react-bootstrap";

function PlaceholderComponent() {
    return (
        <>
            <Card className="m-1 flex flex-row" style={{height: '9rem'}}>
                <Card.Img variant="left"
                          style={{objectFit: "cover", width: '10rem', backgroundColor: '#F5F7F8'}}/>
                <Card.Body className="ml-5">
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={5} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} />
                    </Placeholder>
                    &nbsp;&nbsp;<Placeholder.Button variant="primary" xs={2}/>
                </Card.Body>
            </Card>
        </>
    );
}

export default PlaceholderComponent;