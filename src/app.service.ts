import { Inject, Injectable } from '@nestjs/common';

//database
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(@Inject('MONGO') private database: Db) {}

  getTask() {
    const taskCollection = this.database.collection('task');
    return taskCollection.find().toArray();
  }
}
