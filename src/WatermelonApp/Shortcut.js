export function LocalStorageSetter(a, b) {
    localStorage.setItem(a, JSON.stringify(b));
};

export function LocalStorageGetter(a) {
    return JSON.parse(localStorage.getItem(a));
};
