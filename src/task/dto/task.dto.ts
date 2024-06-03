import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class TaskDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;
}
