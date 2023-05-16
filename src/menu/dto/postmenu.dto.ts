import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PostMenuDto {
  @Type(() => MenuDto)
  @ValidateNested()
  menu: MenuDto[];

  @Type(() => CategoryDto)
  @ValidateNested()
  category: CategoryDto[];

  @Type(() => SubCategoryDto)
  @ValidateNested()
  subCategory: SubCategoryDto[];
}

// * MenuDto ------------------------------

export class MenuDto {
  @IsString()
  @IsNotEmpty()
  connectId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isProtected: boolean;

  @IsBoolean()
  @IsNotEmpty()
  selected: boolean;
}

// * CategoryDto ------------------------------

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  connectId: string;

  @IsString()
  @IsNotEmpty()
  connectMenuId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsBoolean()
  @IsNotEmpty()
  selected: boolean;
}
// * SubCategoryDto ------------------------------

export class SubCategoryDto {
  @IsString()
  @IsNotEmpty()
  connectId: string;

  @IsString()
  @IsNotEmpty()
  connectMenuId: string;

  @IsString()
  @IsNotEmpty()
  connectCategoryId: string;

  @Type(() => subcategoriesDto)
  @ValidateNested()
  subcategories: subcategoriesDto[];
}

// * subcategoriesDto ------------------------------

class subcategoriesDto {
  @IsString()
  @IsNotEmpty()
  connectId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  value: string;
}
