import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ContactService } from 'src/contact/contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/models/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [TasksService, ContactService],
  exports: [TasksService]
})
export class TasksModule {

}
