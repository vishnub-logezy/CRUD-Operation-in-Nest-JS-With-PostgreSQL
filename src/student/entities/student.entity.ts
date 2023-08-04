import { Column, Entity,PrimaryGeneratedColumn } from "typeorm"

@Entity('student')
export class StudentEntity{
    @PrimaryGeneratedColumn('increment')
    id:number
    @Column({type: 'varchar', length: 255})
    name:string
    @Column({type: 'varchar', length: 255})
    email:string
    @Column({type: 'varchar', length: 255})
    password:string
    @Column({type: 'varchar', length: 255})
    phone:string
    @Column({type: 'varchar', length: 255})
    address:string
    @Column({type: 'varchar', length: 255})
    gender:string
    
}
