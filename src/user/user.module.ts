import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EncryptorService } from 'src/common/encryptor.service';
import { CommonModule } from 'src/common/common.module';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule, RoleModule],
  controllers: [UserController],
  providers: [UserService, EncryptorService, RoleService]
})
export class UserModule { }
