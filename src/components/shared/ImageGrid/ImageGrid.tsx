import React from 'react';
import { Image } from '@Types/Image';

import './ImageGrid.scss';

type Props = {
    id?: string,
    className?: string,
    data?: Image[],
}

export const ImageGrid: React.FC<Props> = props => (
    <div
        id={props.id && props.id}
        className={`image-grid ${props.className && props.className}`}
    >
        {props.children}
    </div>
);