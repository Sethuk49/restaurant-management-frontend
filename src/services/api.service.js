import axios from "axios";
import { IsBaseURL } from "./api.interceptor";

const getServiceWithParams = (
    url,
    param,
    isCustom
) => {
    IsBaseURL(isCustom === undefined ? true : isCustom);

    return new Promise(function (resolve, reject) {
        axios
            .get(url, {
                params: param,
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};

const getServices = (url, isCustom) => {
    IsBaseURL(isCustom === undefined ? true : isCustom);
    return new Promise(function (resolve, reject) {
        axios
            .get(url)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};

const postService = (
    url,
    body,
    isCustom = true,
) => {
    IsBaseURL(isCustom === undefined ? true : isCustom);

    return new Promise(function (resolve, reject) {
        axios
            .post(url, body)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};

const patchService = (
    url,
    body,
    isCustom,
    URLName,
    headers
) => {
    IsBaseURL(isCustom === undefined ? true : isCustom, URLName);

    return new Promise(function (resolve, reject) {
        axios
            .patch(url, body, { headers })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};

const fileUploadService = (
    url,
    file,
    isCustom
) => {
    IsBaseURL(isCustom === undefined ? true : isCustom);

    return new Promise(function (resolve, reject) {
        axios
            .post(url, file, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};

const putService = (
    url,
    body,
    isCustom
) => {
    IsBaseURL(isCustom === undefined ? true : isCustom);

    return new Promise(function (resolve, reject) {
        axios
            .put(url, body)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};

const formDataService = (
    url,
    body,
    isCustom
) => {
    IsBaseURL(isCustom === undefined ? true : isCustom);

    return new Promise(function (resolve, reject) {
        axios
            .post(url, body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};

const deleteService = (url, isCustom) => {
    IsBaseURL(isCustom === undefined ? true : isCustom);

    return new Promise(function (resolve, reject) {
        axios
            .delete(url)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};

const postPutService = (
    url,
    body,
    method,
    isCustom
) => {
    IsBaseURL(isCustom === undefined ? true : isCustom);

    return new Promise(function (resolve, reject) {
        axios[method](url, body)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};

const postServiceParams = (
    url,
    body,
    param,
    isCustom = true
) => {
    IsBaseURL(isCustom);

    return new Promise(function (resolve, reject) {
        axios
            .post(url, body, {
                params: param,
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
};


export const commonService = {
    getServiceWithParams,
    postService,
    patchService,
    getServices,
    fileUploadService,
    formDataService,
    deleteService,
    putService,
    postPutService,
    postServiceParams
};
