export class CreateUserDto {
  readonly name: string;
  readonly lastname: string;
  readonly username: string;
  password: string;
  readonly id?: string;
}
