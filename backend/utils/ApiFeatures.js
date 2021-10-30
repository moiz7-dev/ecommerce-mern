class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr?.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({...keyword});

        return this;
    }

    filter() {
        const queryCopy = {...this.queryStr};

        // filter for category only
        const excludedFields = ['keyword', 'page', 'limit'];

        for (let key of excludedFields) {
            delete queryCopy[key];
        };

        //filter for price
        console.log(queryCopy)

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr)); 

        return this;

    }

    pagination(resultsPerPage) {
        const currentPage = this.queryStr?.page || 1;

        const skip = resultsPerPage * (currentPage - 1);

        this.query = this.query.find().limit(resultsPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;