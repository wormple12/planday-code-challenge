import React, { useState, useEffect } from 'react';

import { Image } from '@Types/Image';

import './Gallery.scss';
import { Button } from '@Components/shared/Button/Button';
import { SuspenseLoader } from '@Components/utilities';
import { SuspenseImage } from '@Components/utilities/SuspenseLoader/SuspenseImage';

type Props = {
    id?: string,
    className?: string,
    data: Image[],
    dataLimit: number,
}

export const Gallery: React.FC<Props> = props => {
    const [loadedImages, setLoadedImages] = useState<Image[]>([]);

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setTotalPages(Math.ceil(props.data.length / props.dataLimit));
    }, [props.data])

    useEffect(() => {
        const startIndex = currentPage * props.dataLimit - props.dataLimit;
        const endIndex = startIndex + props.dataLimit;
        setLoadedImages(props.data.slice(startIndex, endIndex));
    }, [props.data, currentPage])

    const goToNextPage = () => {
        setCurrentPage((page) => page + 1);
    }
    const goToPreviousPage = () => {
        setCurrentPage((page) => page - 1);
    }

    return (
        <div
            id={props.id}
            className={`gallery ${props.className && props.className}`}
        >
            <div className="gallery-pagination">
                <Button className="prev-button" variant="alt" disabled={currentPage === 1} onClick={goToPreviousPage}>
                    Previous
                </Button>
                <Button className="next-button" variant="alt" disabled={currentPage === totalPages} onClick={goToNextPage}>
                    Next
                </Button>
            </div>
            <React.Suspense fallback={<SuspenseLoader />}>
                <div className="gallery-view">
                    {loadedImages.map((e, index) => {
                        const key = `image-element-${index}`;
                        return <GalleryItem image={e} id={key} key={key} />;
                    })}
                </div>
            </React.Suspense>
        </div>
    );
};

const GalleryItem: React.FC<{ image: Image, id: string }> = props => {
    const { title, description, imagePath } = props.image;

    return (
        <div className="gallery-item">
            <SuspenseImage id={props.id} src={imagePath} alt={description} />
            <label htmlFor={props.id}>{title}</label>
            <p><i>{description}</i></p>
        </div>
    );
};