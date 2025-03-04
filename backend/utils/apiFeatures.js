class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};

        this.query.find({...keyword})
        return this;
    }

    filter(){
        const queryStrCopy = {...this.queryStr};
        
        const removeFeilds = ['keyword','limit','page'];
        removeFeilds.forEach(feild => delete queryStrCopy[feild]);

        this.query.find(queryStrCopy);

        return this;
    }

    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query.limit(resPerPage).skip(skip);

        return this;
    }
}



module.exports = APIFeatures;