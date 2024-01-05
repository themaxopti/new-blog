import { Injectable } from '@nestjs/common';
import {} from '@app/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../db/entities/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto) {}
}
