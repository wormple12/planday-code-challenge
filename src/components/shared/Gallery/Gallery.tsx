import React from 'react';
import { useImageElement } from '@State/ImageState';

import './Gallery.scss';

type Props = {
    id?: string,
    className?: string,
    list: string[],
}

export const Gallery: React.FC<Props> = props => (
    <section
        id={props.id && props.id}
        className={`gallery ${props.className && props.className}`}
    >
        <div className="gallery-view">
            {props.list.map((e, index) => {
                const key = `image-element-${index}`;
                return <GalleryItem title={e} id={key} key={key} />;
            })}
        </div>
    </section>
);

const GalleryItem: React.FC<{ title: string, id: string }> = props => {
    const { element } = useImageElement(props.title);

    return (
        <div className="gallery-item">
            <img id={props.id} src={element.imagePath} alt={element.description} />
            <label htmlFor={props.id}>{element.title}</label>
        </div>
    );
};