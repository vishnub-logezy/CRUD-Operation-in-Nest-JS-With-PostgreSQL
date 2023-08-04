import { ConfigService } from "@nestjs/config"
import { StudentEntity } from "src/student/entities/student.entity"
import { DataSource } from "typeorm"

export const DbConnection = [
  {
    provide: 'DataSource',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: "postgres",
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities:[StudentEntity],
        logging:true
      })
      return await dataSource.initialize()
    }, 
    inject: [ConfigService]
  }
]