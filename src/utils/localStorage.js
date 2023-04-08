const STORAGE_DATA = "storage_data";

export const getData = () => {
    return JSON.parse(window.localStorage.getItem(STORAGE_DATA));
};

export const setData = (data) => {
    window.localStorage.setItem(STORAGE_DATA, JSON.stringify(data));
};
