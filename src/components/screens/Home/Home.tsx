import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Gallery } from '@Components/shared';
import { useImageList } from '@State/ImageState';
import defaultImages from '@State/ImageStateDefault';

type Props = RouteComponentProps;

export const Home: React.FC<Props> = props => {
    const { imageList, setImageList } = useImageList();

    useEffect(() => {
        setImageList(defaultImages);
    }, [setImageList])

    return (
        <section className="content">
            <h1>Browse Images</h1>
            <p className="sectionDesc">Below a grid view of the application's images are displayed.</p>
            <br />
            <Gallery list={imageList} />
        </section>
    );
};