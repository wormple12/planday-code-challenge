import { atom, atomFamily, AtomEffect, selector, selectorFamily, DefaultValue, useRecoilValue, useRecoilCallback } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { Image } from '@Types/Image';

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: sessionStorage,
});
const syncStorageEffect: AtomEffect<Image> = ({ trigger, setSelf, onSet }) => {
    // Initialize atom value to the auth state
    if (trigger === 'get') { // Avoid expensive initialization

    }

    // Subscribe to local changes and update the server value
    onSet((searchState) => {

    });
};

const imageListState = atom<string[]>({
    key: 'ImageState/List',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

const imageElementState = atomFamily<Image, string>({
    key: 'ImageState/Element',
    default: (title) => ({ title, description: "", imagePath: "" }),
    effects_UNSTABLE: [persistAtom],
});

export const imageElementSelector = selectorFamily<Image, string>({
    key: 'ImageState/Element/Selector',
    get: (title) => ({ get }) => get(imageElementState(title)),
    set: (title) => ({ get, set, reset }, newVal) => {
        if (newVal instanceof DefaultValue) {
            reset(imageElementState(title));
            return;
        }

        set(imageElementState(title), newVal);

        if (get(imageListState).find((title) => title === newVal.title)) return;
        set(imageListState, (prev) => [...prev, newVal.title])
    },
})

export const useImageList = () => {
    const imageList = useRecoilValue(imageListState);
    const setImageList = useRecoilCallback(
        ({ set }) => (list: Image[]) => {
            list.forEach((e => {
                set(imageElementSelector(e.title), e);
            }));
        }, [],
    );
    return { imageList, setImageList };
};

export const useImageElement = (title: string) => {
    const element = useRecoilValue(imageElementSelector(title))

    const upsertElement = useRecoilCallback(
        ({ set }) => (e: Image) => {
            set(imageElementSelector(e.title), e);
        },
        [],
    );
    return { element, upsertElement };
};