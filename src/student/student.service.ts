import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
@Injectable()
export class StudentService {
  private manager: EntityManager
  constructor(
    @Inject('DataSource')
    private dataSource: DataSource
  ) {
    this.manager = this.dataSource.manager
  }


  // create new Student
  async create(CreateStudentDto: CreateStudentDto) {
    try {
      const Student = await this.manager.findOneBy(StudentEntity, { email: CreateStudentDto.email})
      if (Student) {
        throw new Error('Student already exists')
      }
      const createStudent = await this.manager.create(StudentEntity, {
        name: CreateStudentDto.name,
        email: CreateStudentDto.email,
        password: CreateStudentDto.password,
        phone: CreateStudentDto.phone,
        address: CreateStudentDto.address,
        gender: CreateStudentDto.gender
      })
      await this.manager.save(StudentEntity, createStudent)
      return { message: "Student created successfully" }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }

  }

  // update  user
  async updateUser() { }

  // delete  user
  async deleteUser() { }


}