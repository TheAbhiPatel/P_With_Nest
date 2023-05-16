import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './schemas/menu.schema';
import mongoose from 'mongoose';
import { Category } from './schemas/category.schema';
import { SubCategory } from './schemas/subCategory.schema';
import { MongoIdDto } from './dto/mongoId.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name)
    private menuModel: mongoose.Model<Menu>,
    @InjectModel(Category.name)
    private catModel: mongoose.Model<Category>,
    @InjectModel(SubCategory.name)
    private subCatModel: mongoose.Model<SubCategory>,
  ) {}

  // // ___________________________________

  async createMenu(body, userId) {
    const data: any = body;

    try {
      const { menu, category, subCategory } = data;
      const savedMenu: any[] = [];

      for (let i = 0; i < menu.length; i++) {
        const {
          name,
          connectId,
          isProtected,
          selected,
          label,
          password,
          value,
        } = menu[i];
        const newMenu = await this.menuModel.create({
          userId,
          connectId,
          name,
          label,
          value,
          password,
          isProtected,
          selected,
        });

        savedMenu.push(newMenu);
      }
      // ---------------------- category------------------------------

      const savedCat = savedMenu.map(async (oneMenu: any) => {
        const menuId = oneMenu._id;

        const categories = category.filter(
          (cat: any) => cat.connectMenuId == oneMenu.connectId,
        );

        const catPromises = categories.map(async (item: any) => {
          const { name, selected, connectId, connectMenuId, label, value } =
            item;
          return this.catModel
            .create({
              userId,
              menuId,
              connectId,
              connectMenuId,
              name,
              selected,
              label,
              value,
            })
            .then(function (results) {
              return results;
            });
        });
        const promiseArray = await Promise.all(catPromises).then(function (
          results,
        ) {
          return results;
        });
        return promiseArray;
      });

      const savedCategory = await Promise.all(savedCat).then(function (
        results,
      ) {
        return results;
      });

      //  --------------------- sub category-------------------------------

      savedCategory.flat().map(async (item: any) => {
        const { menuId, _id, connectId } = item;
        const oneSubCategories = subCategory.filter(
          (subCat: any) => subCat.connectCategoryId == connectId,
        );

        const { subcategories, connectMenuId, connectCategoryId } =
          oneSubCategories[0];

        const saveSubCatPromise = subcategories.map(async (item: any) => {
          const { name, connectId, label, value } = item;
          return this.subCatModel
            .create({
              userId,
              menuId,
              categoryId: _id,
              connectId,
              connectMenuId,
              connectCategoryId,
              name,
              label,
              value,
            })
            .then(function (results) {
              return results;
            });
        });
        await Promise.all(saveSubCatPromise).then(function (results) {
          return results;
        });
      });

      return {
        success: true,
        message: 'Menu added successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllMenus(userId: string) {
    try {
      const menu = await this.menuModel.find({ userId });
      if (menu.length == 0) {
        throw new NotFoundException('Menu not found');
      }

      const category = await this.catModel.find({ userId });
      if (category.length == 0) {
        throw new NotFoundException('Menu not found');
      }

      const subCategory = await this.subCatModel.find({ userId });
      if (subCategory.length == 0) {
        throw new NotFoundException('Menu not found');
      }

      return {
        success: true,
        message: 'Menu fetched successfully',
        menu,
        category,
        subCategory,
      };
    } catch (error) {
      throw error;
    }
  }

  async getMenu(userId: string, { menuId }: MongoIdDto) {
    try {
      const menu = await this.menuModel.find({
        userId,
        _id: menuId,
      });

      if (menu.length === 0) {
        throw new NotFoundException('Menu not found');
      }

      const category = await this.catModel.find({
        userId,
        menuId,
      });

      if (category.length === 0) {
        throw new NotFoundException('Menu not found');
      }

      const subCategory = await this.subCatModel.find({
        userId,
        menuId,
      });

      if (subCategory.length === 0) {
        throw new NotFoundException('Menu not found');
      }

      return {
        success: true,
        message: 'Menu fetched successfully',
        menu,
        category,
        subCategory,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteMenu({ menuId }: MongoIdDto) {
    try {
      const menu = await this.menuModel.findByIdAndDelete({
        _id: menuId,
      });

      if (!menu) {
        throw new NotFoundException('Menu not found ');
      }

      const category = await this.catModel.deleteMany({
        menuId,
      });

      const subCategory = await this.subCatModel.deleteMany({
        menuId,
      });

      return {
        success: true,
        message: 'Menu deleted successfully',
        menu,
        category,
        subCategory,
      };
    } catch (error) {
      throw error;
    }
  }
}
