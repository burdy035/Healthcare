export const setItem = function*(item, value) {
    yield localStorage.setItem(`${item}`, `${value}`);
};

export const getItem = function*(item) {
    yield localStorage.getItem(`${item}`);
};
