import apiService from "../api/apiService"

const apiMap = {
  "/inscripciones": apiService.getChildList,
};

const getDataForCurrentPath = async pathname => {
    switch (pathname) {
        case "/inscripciones":
            return await apiMap[pathname]();
        default:
            return [];
    }
}

export default getDataForCurrentPath;
