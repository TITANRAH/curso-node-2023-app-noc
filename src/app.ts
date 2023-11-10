import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";





(async()=>{
  main();
})();

async function main(){

    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME
    });

    const prisma = new PrismaClient()
    const newLog = prisma.logModel.create({
      data: {
        level:'HIGH',
        message: 'text message',
        origin: 'app.ts',
      }
    })

    //Crear una coleccion = tables, documento= registro

    // instancia para guardar en mongo db
    // const newLog = await LogModel.create({
    //   message: "Test Message",
    //   origin: "app.ts",
    //   level: "low",
    // })

    // await newLog.save();

    // console.log(newLog);

    // const logs = await LogModel.find();
    // console.log(logs);
    
    

    // Server.start();
    // console.log( envs);
    
}