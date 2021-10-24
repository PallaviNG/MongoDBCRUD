const { MongoClient, ObjectId } = require("mongodb");

const connectURL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectURL);
const connect_db = "productDB";

const indexController = {
    getProductList: async function (req, res) {
        try {
            await client.connect();
            const db = client.db(connect_db);
            const collection = db.collection("productList");
            let result = await collection.find().toArray();
            res.send({ status: true, result });
        }
        catch (error) {
            res.send({ status: false, error: error + "is" });
        }
    },
    saveNewProduct: async function (req, res) {
        var data = req.body;
        try {
            await client.connect();
            const db = client.db(connect_db);
            const collection = db.collection("productList");
            let result = await collection.insertOne(data);
            res.send({status:true,result});
        } catch (error) {
            res.send({status:false,error});
        }
    },
    updateProduct : async function(req,res) {
        var data = req.body;
        try {
            await client.connect();
            const db= client.db(connect_db);
            const collection = db.collection("productList");
            let result = await collection.updateOne({_id:ObjectId(data._id)},
            {
                $set:{
                    brand:data.brand,
                    price:data.price,
                    mfgDate:data.mfgDate,
                    mfgPlace:data.mfgPlace,
                    model:data.model
                }
            });
            res.send({status:true,result});
        } catch (error) {
            res.send({status:false,error});                 
        }
    },
    deleteProduct : async function (req,res) {
        var deleteID = req.query._id;
        // console.log("deleteID: "+deleteID);
        console.log(deleteID);
        try{  
            await client.connect();
            const db=client.db(connect_db);
            const collection = db.collection("productList");

            var result = await collection.deleteOne({_id:ObjectId(deleteID)});
            res.send({status:true,result});
        } catch (error) {
            res.send({status:false,error});
        }
    }
};

module.exports = indexController;



// db.productList.insert({"brand":"Samsung","price":"15050","mfgDate":"21-04-2019","mfgPlace":"India","model":"Samsung Galaxy F12 4G","mfgCode":"416ae34"})
// db.productList.insert({"brand":"Micromax","price":"2899","mfgDate":"3-07-2021","mfgPlace":"China","model":"Micromax q402 4G","mfgCode":"97362"})
// db.productList.insert({"brand":"Micromax","price":"2200","mfgDate":"02-01-2020","mfgPlace":"Bangalore","model":"Micromax a102 5G","mfgCode":"76456"})
// db.productList.insert({"brand":"vivo","price":"7800","mfgDate":"08-12-2020","mfgPlace":"India","model":"Vivo v21 4G","mfgCode":"abc3746"})
// db.productList.insert({"brand":"redmi","price":"6200","mfgDate":"15-06-2021","mfgPlace":"India","model":"Vivo Y20 5G","mfgCode":"8374da"})
// db.productList.insert({"brand":"motorola","price":"52990","mfgDate":"28-02-2021","mfgPlace":"US","model":"Motorola 592L 5G","mfgCode":"37483"})
// db.productList.insert({"brand":"jio","price":"1800","mfgDate":"21-04-2019","mfgPlace":"India","model":"Reliance Digital JIO 4G","mfgCode":"74657"})