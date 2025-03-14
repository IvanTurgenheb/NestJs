import { Injectable } from '@nestjs/common';
import { UsersModel } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly userRepository: Repository<UsersModel>,
  ) {}

  async createUser(email: string, password: string, nickname: string) {
    const user = this.userRepository.create({
      email,
      password,
      nickname,
    });

    return await this.userRepository.save(user);
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }
}
