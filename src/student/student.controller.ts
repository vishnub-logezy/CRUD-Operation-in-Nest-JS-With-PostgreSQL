import { Body, Controller, Post } from '@nestjs/common'
import { StudentService } from './student.service'
import { CreateStudentDto } from './dto/create-student.dto'

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post('create')
  async createStudent(@Body() CreateStudentDto: CreateStudentDto) {
    console.log("from controller",CreateStudentDto)
    return await this.studentService.create(CreateStudentDto);
  }



}