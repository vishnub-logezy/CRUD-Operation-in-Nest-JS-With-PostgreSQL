import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { StudentService } from './student.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post('create')
  async createStudent(@Body() CreateStudentDto: CreateStudentDto) {
    console.log("from controller", CreateStudentDto)
    return await this.studentService.create(CreateStudentDto);
  }
  
  @Post('delete/:id')
  async deleteStudent(@Param() param) {
    console.log("from controller param", param)
    return await this.studentService.deleteStudent(param.id);
  }

  @Get('')
  async getAll() {
    return await this.studentService.getAll();
  }

  @Get('/:id')
  async getStudentById(@Param() param) {
    return await this.studentService.getStudentById(param.id);
  }

  @Patch('update/:id')
  async updateStudent(@Param() param,@Body() data:UpdateStudentDto) {
    return await this.studentService.updateStudent(param.id,data);
  }


}


