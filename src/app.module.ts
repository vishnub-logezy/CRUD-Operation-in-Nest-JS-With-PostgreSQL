import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import {ConfigModule} from '@nestjs/config';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';

@Module({
  imports: [DbModule ,ConfigModule.forRoot({isGlobal: true})],
  controllers: [StudentController],
  providers: [StudentService],
})
export class AppModule {}
