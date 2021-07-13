export const updateObjectInArray = (arr, objSearchParam, checkSearchVal, newObjParams) => {
    return arr.map((item) => {
        if (item[objSearchParam] === checkSearchVal)
            return { ...item, ...newObjParams };

        return item;
    })
};