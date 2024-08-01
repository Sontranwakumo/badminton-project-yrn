import { ConfigModule } from "@nestjs/config";
import { BaseEntity, DataSource, DataSourceOptions } from 'typeorm';
import { configuration } from "../../src/config/config.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { INestApplication, ValidationPipe, VersioningType } from "@nestjs/common";
import { TestingModule } from "@nestjs/testing";
import { DatabaseTestConfigService } from "../../src/config/database-test.config.js";

import * as entitiesIndex from '../../src/entities/index.js';
import { UserRole } from "../../src/commons/enums/UserRole.enum.js";
import { Branch, CourtInfo, User } from "../../src/entities/index.js";
import { fa, faker } from "@faker-js/faker";
import { CreateOrderFormDto } from "src/v1/order-forms/dto/create-order-form.dto.js";
import { format } from 'date-fns';
const entities = Object.values(entitiesIndex).filter((entity: any) => BaseEntity.isPrototypeOf(entity));

export const IMPORT_MODULES = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useClass: DatabaseTestConfigService,
  }),
];

export async function getSynchronizeConnection() {
  const dataSource = new DataSource({
    name: 'default',
    type: 'postgres' as const,
    username: process.env.DB_USER,
    database: process.env.DB_NAME_TEST,
    password: process.env.DB_PASSWORD,
    entities: entities as any,
    synchronize: true,
  } as DataSourceOptions);
  
  await dataSource
    .initialize()
    .then(async (_) => await dataSource.synchronize(true));
  return dataSource;
}

export async function clearDB(dataSource: DataSource) {
  const entities = dataSource.entityMetadatas;

  const truncatePromises = entities.map(entity => {
    const repository = dataSource.getRepository(entity.name);
    return repository.query(
      `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
    );
  });

  await Promise.all(truncatePromises);
}

export function createNestApplication(module: TestingModule): INestApplication {
  const app =  module.createNestApplication();
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: false,
  });
  app.useGlobalPipes(new ValidationPipe());

  return app;
}

export async function getRandomUser(role = UserRole.USER){
  const user = new User();
  user.username = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.fullname = faker.person.fullName();
  user.phone = faker.phone.imei();
  user.role = role;
  await user.save();
  return user;
}
export async function createRandomBranch(user: User) {
  if (user.role == UserRole.ADMIN){
    // generate new branch
    const branch = new Branch();
    branch.owner = user;
    branch.name = 'brancha';
    branch.address = faker.location.streetAddress();
    await branch.save();
    let courts: CourtInfo[] = [];
    for (let i: number = 1; i<4; i++){
      const court = new CourtInfo();
      court.branch = branch;
      court.id_branch = branch.id;
      court.description = `Sân số ${i}`;
      court.name = `San${i}`;
      await court.save();
      courts.push(court);
    }
    return {branch, courts}
  }
}

export async function createRandomOrderDto(user:User,court:CourtInfo) {
  const order:CreateOrderFormDto = {
    sender_id : user.id,
    court_id : court.id,
    note: faker.commerce.productDescription(),
    booking_date: format(faker.date.future(),'yyyy-MM-dd'),
    start_time: '13:00',
    end_time: '17:00'
  }
  return order;
}

export async function createRandomOrder(user:User,court:CourtInfo) {
  const dto = createRandomOrderDto(user,court);
    
}
