export class QueryAnalyzer {
  query: any | undefined;
  reqQuery: any | undefined;

  constructor(initialQuery: object, reqQuery: any) {
    this.query = initialQuery;
    this.reqQuery = reqQuery;
  }

  filter() {
    const queryObj: any = { ...this.reqQuery };

    // Remove unrelated field: sort
    delete queryObj['sort'];

    for (let prop in queryObj) {
      // Using Regex with Case Insensitive
      if (queryObj[prop].hasOwnProperty('regex')) {
        queryObj[prop].$options = 'i';
      }
    }
    // Convert Url Operators to MongoDB Operators
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt|regex|all)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.reqQuery && this.reqQuery.sort) {
      const sortObj = this.reqQuery.sort;
      const sortBy = sortObj.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }
}
