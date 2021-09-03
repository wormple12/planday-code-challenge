import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { Image } from '@Types/Image';
import defaultImages from '@State/ImageStateDefault';

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: sessionStorage,
});

export const imageState = atom<Image[]>({
    key: 'ImageState',
    default: defaultImages,
    effects_UNSTABLE: [persistAtom],
});

export const searchState = atom<string>({
    key: 'ImageState/Search',
    default: "",
});

export const filteredImageSelector = selector<Image[]>({
    key: "ImageState/Filtered",
    get: ({ get }) => {
        const images = get(imageState);
        const search = get(searchState).toLowerCase();
        return images.filter(e => e.title.toLowerCase().includes(search));
    }
})