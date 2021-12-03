export class QueryAnalyzer {
  query: any | undefined;
  reqQuery: object | undefined;

  constructor(initialQuery: object, reqQuery: object) {
    this.query = initialQuery;
    this.reqQuery = reqQuery;
  }

  filter() {
    const queryObj: any = { ...this.reqQuery };
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
}
