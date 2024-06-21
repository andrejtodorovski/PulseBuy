import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../models/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { UserEventsService } from "./user-events.service";
import { UserCreatedEvent } from "./events/users.event";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userEventsService: UserEventsService
  ) {
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword
    });

    const userPromise = this.usersRepository.save(user);

    userPromise.then((u) => {
      this.userEventsService.emitEvent(new UserCreatedEvent(u.id, u));
    });

    return userPromise;
  }

  async updatePermissions(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    user.isAdmin = !user.isAdmin;
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find(
      {
        order: {
          id: "ASC"
        }
      }
    );
  }

  findAllUsers(): Promise<User[]> {
    return this.usersRepository.find(
      {
        where: { isAdmin: false },
        order: {
          id: "ASC"
        }
      }
    );
  }

  findAllAdmins(): Promise<User[]> {
    return this.usersRepository.find(
      {
        where: { isAdmin: true },
        order: {
          id: "ASC"
        }
      }
    );
  }
}
