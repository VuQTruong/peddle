/*
 * Usage
 *  queryObj = {
 *    name: { regex: value },
 *    price: { gt: minVal, lte: maxVal },
 *    sort: sortField,-sortField,
 *  }
 */

const queryBuilder = (queryObj: any) => {
  if (!queryObj) return '';

  let queryString = '';

  let index = 0;
  for (let prop in queryObj) {
    const value = queryObj[prop];

    if (value === null) continue;

    if (index !== 0) {
      queryString += '&';
    }

    index++;
    if (typeof value === 'object') {
      let innerIdx = 0;
      for (let operator in value) {
        if (innerIdx !== 0) {
          queryString += '&';
        }

        queryString += `${prop}[${operator}]=${value[operator]}`;
        innerIdx++;
      }
    } else {
      queryString += `${prop}=${queryObj[prop]}`;
    }
  }

  return queryString;
};

export default queryBuilder;
