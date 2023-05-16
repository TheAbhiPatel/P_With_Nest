import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from './menu/schemas/category.schema';
import { menuSchema } from './menu/schemas/menu.schema';
import { subCategorySchema } from './menu/schemas/subCategory.schema';

const Models = [
  { name: 'Menu', schema: menuSchema },
  { name: 'Category', schema: categorySchema },
  { name: 'SubCategory', schema: subCategorySchema },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(Models)],
  exports: [MongooseModule],
})
export class MongooseModelModule {}
