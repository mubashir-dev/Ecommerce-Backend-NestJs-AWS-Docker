import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;
    const isExists = await this.roleRepository.findOne({
      where: {
        name
      }
    });
    if (isExists) {
      throw new HttpException(`Role with name ${name} already exists`, HttpStatus.CONFLICT);
    }
    return this.roleRepository.save(createRoleDto);
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
      where: {
        id
      }
    });
    if (!role) {
      throw new HttpException(`Role with this ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({
      where: {
        id
      }
    });
    if (!role) {
      throw new HttpException(`Role with this ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    return this.roleRepository.save({
      ...role,
      ...updateRoleDto
    })
  }

  async remove(id: number) {
    const role = await this.roleRepository.findOne({
      where: {
        id
      }
    });
    if (!role) {
      throw new HttpException(`Role with this ${id} does not exist`, HttpStatus.NOT_FOUND);
    }
    return this.roleRepository.remove(role);
  }
}
