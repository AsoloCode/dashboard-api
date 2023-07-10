import { IUserService } from './user.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './user.entity';
import { injectable } from 'inversify';

@injectable()
export class UsersService implements IUserService {
	createUser({ email, name, password }: UserRegisterDto): User | null {
		return null;
	}

	validateUser(dto: UserLoginDto): boolean {
		return true;
	}
}
