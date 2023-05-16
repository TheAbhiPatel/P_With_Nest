import { IsMongoId, IsNotEmpty } from 'class-validator';

export class MongoIdDto {
  @IsMongoId()
  @IsNotEmpty()
  menuId: string;
}
