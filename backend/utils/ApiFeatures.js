class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: 'samosa',
                $options: 'i'
            }
        } : {}


        this.query = this.query.find({...keyword});

        return this;
    }
}

module.exports = ApiFeatures;