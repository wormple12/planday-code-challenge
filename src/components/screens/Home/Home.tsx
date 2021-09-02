import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { readFile } from 'fs';

import { ImageGrid } from '@Components/shared';
import { Image } from '@Types/Image';

type Props = RouteComponentProps;

const getImages = (): Image[] => {
    let result: Image[] = [];
    readFile('/planday-challenge-data.json', 'utf8', (err, content) => { // Perhaps use readFileSync for Suspense-Loader to work?
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }
        try {
            result = JSON.parse(content) as Image[];
        } catch (err) {
            console.log('Error parsing JSON string:', err);
        }
    });
    return result;
}

export const Home: React.FC<Props> = props => {
    const [images, setImages] = useState<Image[]>(getImages()); // SHOULD BE GLOBAL

    return (
        <div className="content">
            <h1>Browse Images</h1>
            <p className="sectionDesc">Below a grid view of the application's images are displayed.</p>
            <br />
            <ImageGrid data={images} />
        </div>
    );
};