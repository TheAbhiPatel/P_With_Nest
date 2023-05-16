import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { MongoIdDto } from './dto/mongoId.dto';
import { PostMenuDto } from './dto/postmenu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post()
  createMenu(@Req() req: Request, @Body() body: PostMenuDto) {
    const userId = req['user']?.userId;
    return this.menuService.createMenu(body, userId);
  }

  @Get()
  getAllMenus(@Req() req: Request) {
    const userId = req['user']?.userId;
    return this.menuService.getAllMenus(userId);
  }

  @Get(':menuId')
  getMenu(@Req() req: Request, @Param() menuId: MongoIdDto) {
    const userId = req['user']?.userId;

    return this.menuService.getMenu(userId, menuId);
  }

  @Delete(':menuId')
  deleteMenu(@Param() menuId: MongoIdDto) {
    return this.menuService.deleteMenu(menuId);
  }
}
