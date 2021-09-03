import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filteredImageSelector, searchState } from '@State/ImageState';

import { Gallery } from './Gallery/Gallery';
import { InputField } from '@Components/shared';

type Props = RouteComponentProps;

export const Home: React.FC<Props> = props => {
    const [search, setSearch] = useRecoilState(searchState);
    const filteredImages = useRecoilValue(filteredImageSelector);

    return (
        <section className="content">
            <h1>Browse Images</h1>
            <p className="sectionDesc">Below a grid view of the application's images are displayed.</p>
            <br />
            <InputField
                value={search} setValue={setSearch}
                inputAttributes={{ placeholder: "Search for images here..." }}
            />
            {filteredImages.length > 0 ? (
                <Gallery data={filteredImages} dataLimit={7} />
            ) : (
                <p>Sorry, no results were found.</p>
            )}
        </section>
    );
};