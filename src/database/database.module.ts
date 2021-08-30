import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Base de datos
// import { MongoClient } from 'mongodb';

// Variables de entorno
import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, dbName } =
          configService.mongo;
        return {
          uri: `${connection}://${user}:${password}@${host}`,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    // {
    //   provide: 'MONGO',
    //   useFactory: async (configService: ConfigType<typeof config>) => {
    //     const { connection, user, password, port, host, dbName } =
    //       configService.mongo;
    //     const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
    //     const client = new MongoClient(uri);
    //     await client.connect();
    //     const database = client.db(dbName);
    //     return database;
    //   },
    //   inject: [config.KEY],
    // },
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
