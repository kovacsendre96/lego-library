const sortByKey = (sortArrayByType, sortDirection, legoData, key) => {
  let result = [];
  const sortByYearAsc = (yearArray) => {
    yearArray.sort(function (a, b) {
      return a - b;
    });
  };

  const sortByYearDesc = (yearArray) => {
    yearArray.sort(function (a, b) {
      return b - a;
    });
  };

  if (sortDirection === "asc") {
    sortByYearAsc(sortArrayByType);
  } else {
    sortByYearDesc(sortArrayByType);
  }
  let iterateLegoData = legoData;
  sortArrayByType.filter((data) => {
    const yearReleased = parseInt(data);
    iterateLegoData.forEach((lData) => {
      const filterData = lData;
      if (yearReleased === parseInt(filterData[key])) {
        result = [...result, filterData];
        iterateLegoData = iterateLegoData.filter(
          (oldData) => oldData !== filterData
        );
      }
    });
  });
  return result;
};

const sortyByName = (sortArrayByType, sortDirection, legoData) => {
  let result = [];
  const sortByNameAsc = (nameArray) => {
    nameArray.sort();
  };

  const sortByNameDesc = (nameArray) => {
    nameArray.sort();
    nameArray.reverse();
  };

  if (sortDirection === "asc") {
    sortByNameAsc(sortArrayByType);
  } else {
    sortByNameDesc(sortArrayByType);
  }
  let iterateLegoData = legoData;
  sortArrayByType.filter((data) => {
    iterateLegoData.forEach((lData) => {
      const filterData = lData;
      if (data === lData.name) {
        result = [...result, filterData];
        iterateLegoData = iterateLegoData.filter(
          (oldData) => oldData !== filterData
        );
      }
    });
  });
  return result;
};

const takeOutOfTheArray = (data, dataKey) => {
  const sortArrayByType = [];
  data.forEach((year) => {
    sortArrayByType.push(year[dataKey]);
  });
  return sortArrayByType;
};

export const sortByType = (legoData, sortDirection, dataKey) => {
  let sortResult = [];
  let sortArrayByType = takeOutOfTheArray(legoData, dataKey);

  switch (dataKey) {
    case "year_released":
      sortResult = sortByKey(
        sortArrayByType,
        sortDirection,
        legoData,
        "year_released"
      );
      break;
    case "name":
      sortResult = sortyByName(sortArrayByType, sortDirection, legoData);
      break;
    case "number_of_pieces":
      sortResult = sortByKey(
        sortArrayByType,
        sortDirection,
        legoData,
        "number_of_pieces"
      );
      break;
    case "max_price":
      sortResult = sortByKey(
        sortArrayByType,
        sortDirection,
        legoData,
        "max_price"
      );
      break;
  }
  return sortResult;
};
