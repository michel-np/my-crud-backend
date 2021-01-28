

const dbName = process.env.MONGODBNAME;


const MongoDb = require('mongodb');


getConnection = async (p_dbName) => {
    try {
        let connection = await MongoDb.connect(process.env.MONGO_OLDER_URI, { useUnifiedTopology: true });
        let v_DbName = p_dbName ? p_dbName : dbName;
        return connection.db(v_DbName);
    }
    catch (err) {
        console.log(err.message);
        process.exit(0);
    }

}

const mongodbConnection = getConnection();
console.log(mongodbConnection)

/**
 * @param payload the collection and/or document to be manipulated
 *
 */


exports.save = async (payload) => {
    try {
        let {
            collection,
            document,
        } = payload;
        let instance = await mongodbConnection;
        let target = instance.collection(collection);
        return target.insertOne(document);
    }
    catch (err) {
        throw new Error(error.message);
    }
}

exports.saveMultiple = async (payload) => {
    try {
        let {
            collection,
            documents
        } = payload;
        let instance = mongodbConnection;
        let target = instance.collection(collection);
        return target.insertMany(documents)
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.find = async (payload) => {
    try {
        let {
            limit,
            query,
            collection,
            fieldsToShow,
            skip,
            sort,
            dbName,
        } = payload;
        let instance = null;
        if (!dbName) {
            instance = await mongodbConnection;
        } else {
            instance = await getConnection(dbName);
        }
        let target = instance.collection(collection)
        return target.find(query)
            .sort(sort)
            .project(fieldsToShow)
            .limit(limit || limit == 0 ? limit : 10)
            .skip(skip ? skip : (payload.page ? payload.page * payload.limit : 0))
            .toArray();
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.deleteOne = async (payload) => {
    try {
        let {
            collection,
            query
        } = payload;
        let instance = await mongodbConnection;
        let target = instance.collection(collection);
        return target.deleteOne(query);
    } catch (error) {
        throw new Error(error.message)
    }
}


exports.findOne = async (payload) => {
    try {
        let { collection, query } = payload;
        let instance = await mongodbConnection;
        let target = instance.collection(collection);
        return target.findOne(query);
    } catch (error) {

    }
}

exports.updateOne = async (payload) => {
    try {
        let { collection, query, document } = payload;
        let instance = await mongodbConnection;
        let target = instance.collection(collection);
        return target.updateOne(query, document, { upsert: true });
    } catch (error) {
        throw new Error(error.message)
    }
}