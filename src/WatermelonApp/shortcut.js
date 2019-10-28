export function localStorageSetter(a, b) {
    localStorage.setItem(a, JSON.stringify(b));
};

export function localStorageGetter(a) {
    return JSON.parse(localStorage.getItem(a));
};
