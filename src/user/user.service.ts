import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EncryptorService } from './../common/encryptor.service';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RoleService,
    private encryptorService: EncryptorService,
  ) { }


  async create(createUserDto: CreateUserDto) {
    const { password, email, role, username } = createUserDto;
    const isValid: any = await this.validate(email, username, role);
    if (isValid)
      throw new HttpException(isValid?.error, isValid?.status);
    const passwordHash = await this.encryptorService.encrypt(password, parseInt(process.env.ENCRYPTOR_SALT));
    const data: any = createUserDto;
    data.passowrd = passwordHash;
    return this.userRepository.save(data);
  }

  findAll() {
    return this.userRepository.find({
      order: {
        id: 'DESC'
      }
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id }
    });
    if (!user)
      throw new HttpException('User does not found', HttpStatus.NOT_FOUND);
    const { email, username, role } = updateUserDto;
    const isValid: any = await this.validate(email, username, role);
    if (isValid)
      throw new HttpException(isValid?.error, isValid?.status);
    return this.userRepository.save({
      ...user,
      ...updateUserDto
    })
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    });
    if (!user) {
      throw new HttpException(`User with this ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    return this.userRepository.remove(user);
  }

  async validate(email, username, role) {
    //check email
    const isEmailExists = await this.userRepository.findOne({ where: { email } })
    if (isEmailExists) {
      return { error: 'Email has already taken', status: 409 }
    }


    //check username
    const isUsernameExists = await this.userRepository.findOne({ where: { username } })
    if (isUsernameExists) {
      return { error: 'Username already exists', status: 409 }
    }

    //check roledata exists
    const isRoleExists = await this.roleService.validate(role);
    if (!isRoleExists) {
      return { error: `Role metadata doen't exits`, status: 404 }
    }
    return false;
  }
}
