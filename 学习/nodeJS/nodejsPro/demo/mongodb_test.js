const MongoClient = require('mongodb').MongoClient;
//const {MongoClient} = require('mongodb');

//Connection URL
const url = 'mongodb://localhost:27017';
//Database Name
const dbName = 'test';
//实例化
const client = new MongoClient(url, { useUnifiedTopology: true });

//User connect method to connect to the server
client.connect(function(error){
    if(error){
        console.log(error);
        return;
    }
    console.log("数据库连接成功")
    const db = client.db(dbName);
    const collection_user = db.collection("user");

    //查找数据
    collection_user.find({}).toArray((error,data)=>{
        console.log("数据",data);
        client.close();
    });
    //增加数据
    // collection_user.insertOne({name:"李四",age:"22"},(error,result)=>{
    //     if(error){
    //         console.log(error);
    //         return;
    //     }
    //     console.log("增加成功",result);
    //     client.close();
    // })
    //修改数据
    // collection_user.updateOne({name:'张三'},{$set:{age:"23"}},(error,result)=>{
    //     if(error){
    //         console.log("修改失败",error);
    //         return;
    //     }
    //     console.log("修改成功",result);
    //     client.close();
    // })
    //删除数据
    // collection_user.deleteOne({name:"李四"},(error,result)=>{
    //     if(error){
    //         console.log("删除一条数据失败",error);
    //         return;
    //     }
    //     console.log("删除一条成功",result);
    //     client.close();
    // })
})