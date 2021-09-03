import React, { Fragment } from 'react';

import { Image } from '@Types/Image';
import { useImageElement } from '@State/ImageState';

import './ImageGrid.scss';

type Props = {
    id?: string,
    className?: string,
    list: string[],
}

export const ImageGrid: React.FC<Props> = props => (
    <ul
        id={props.id && props.id}
        className={`image-grid ${props.className && props.className}`}
    >
        {props.list.map((e, index) => <ImageElement title={e} key={`image-element-${index}`} />)}
        <li />
    </ul>
);

const ImageElement: React.FC<{ title: string, key: string }> = props => {
    const { element } = useImageElement(props.title);

    return (
        <li>
            {/* <img id={props.key} className="image-element" src={element.imagePath} alt={element.description} /> */}
            <div className="image-element">
                <img id={props.key} src={element.imagePath} alt={element.description} />
                {/* <label htmlFor={props.key}>{element.title}</label> */}
            </div>
        </li>
    );
};