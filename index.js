const MongoClient =require("mongodb").MongoClient;

const dboper=require("./operations");

const url="mongodb://localhost:27017/";
const dbName="nucampsite";

(async function(){
    try{
        const client=await MongoClient.connect(url,{});
        console.log('Connected correctly to server');

        const db= client.db(dbName);

        try{
            const dropResult= await db.dropCollection("campsites");
            console.log('Dropped Collection',dropResult);

        }catch{
            console.log('There is nothing to drop here');
        }

        const documentToInsert = {name:"Breadcrumb Trail Campground", description:"Test"};

        const insertResult =await dboper.insertDocument(db,documentToInsert,'campsites');
        console.log("inserted document:",{
            _id:insertResult.insertedId,
            ...documentToInsert
        });
        const findDocs=await dboper.findDocuments(db,'campsites');
        console.log("Found Document: ",findDocs);

        const updateDocs=await dboper.updateDocument(db,{name:"Breadcrumb Trail Campground"},{description:"updated test description"},'campsites');
        console.log("Updated Document Count:",updateDocs.modifiedCount);

        const updatedDocs=await dboper.findDocuments(db,'campsites')
        console.log("Found Documents:",updatedDocs);

        const removeDocs=await dboper.removeDocument(db,{name:"Breadcrumb Trail Campground"},'campsites');
        console.log("Removed document:", removeDocs.deletedCount);
            
        await client.close();
    }catch(err){
        console.log(err);
    }
}
)();