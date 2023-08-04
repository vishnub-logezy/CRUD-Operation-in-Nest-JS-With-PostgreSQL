import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
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
      const Student = await this.manager.findOneBy(StudentEntity, { email: CreateStudentDto.email })
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
  async updateStudent(id: number, data: UpdateStudentDto) {
    try {
      const Student = await this.manager.findOneBy(StudentEntity, { id })
      if (!Student) {
        throw new Error('Student Not found')
      }
      Student.name = data.name,
      Student.email = data.email,
      Student.password = data.password,
      Student.phone = data.phone,
      Student.address = data.address,
      Student.gender = data.gender
      await this.manager.update(StudentEntity,id,Student)
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }

  // delete  user
  async deleteStudent(id: number) {
    try {
      const Student = await this.manager.findOneBy(StudentEntity, { id })
      if (!Student) {
        throw new Error('Student is not found ')
      }
      await this.manager.delete(StudentEntity, id)
      return { message: "Student Deleted successfully" }
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }


  // async getAll() {
  //   try {
  //     const Student = this.manager.find(StudentEntity);
  //     return (await Student).length === 0
  //       ? { message: "Sucess ", data: Student }
  //       : { message: "Empty Database", data: Student };
  //   } catch (error) {
  //     throw new NotFoundException(`${error.message}`);
  //   }
  // }


  async getAll() {
    try {
      const students = await this.manager.find(StudentEntity);

      return students.length === 0
        ? { message: "Empty Database", data: students }
        : { message: "Success!", data: students };
    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }


  async getStudentById(id: number) {
    try {
      const Student = await this.manager.findOneBy(StudentEntity, { id })
      if (!Student) {
        throw new Error('Student is not found ')
      }
      return Student

    } catch (error) {
      throw new NotFoundException(`${error.message}`);
    }
  }
}