import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useRecoilState } from 'recoil';

import "./AddImage.scss";
import { Button, InputField } from '@Components/shared';
import { imageState } from '@State/ImageState';

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

type Props = RouteComponentProps;

export const AddImage: React.FC<Props> = props => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [images, setImages] = useRecoilState(imageState);

    const onFormSubmit = (evt) => {
        evt.preventDefault();
        setImages([{ title, description, imagePath: `https://picsum.photos/id/${getRandomInt(1, 300)}/200/300` }, ...images]);

        setTitle(""); setDescription("");
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
    }

    return (
        <section className="content add-image-section">
            <h1>Add new image</h1>
            <p className="sectionDesc">This part of the the application has not yet been completed.</p>
            <br />
            <form id="add-image-form" onSubmit={onFormSubmit} target="#">
                <InputField
                    label="Title"
                    value={title} setValue={setTitle}
                    inputAttributes={{ required: true }}
                />
                <InputField
                    label="Description"
                    value={description} setValue={setDescription}
                    inputAttributes={{ required: true }}
                />
                <Button
                    variant="alt"
                    type="submit"
                    form="add-image-form"
                >
                    Add new image
                </Button>
            </form>
            <p id="add-image-message" className={showMessage ? "active" : ""}>
                A random image with the given title and description was added to the collection.
            </p>
        </section>
    );
};