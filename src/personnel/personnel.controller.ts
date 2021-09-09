import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { PersonnelService } from './personnel.service';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';

@Controller('personnel')
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @Get()
  async index(@Res() res, @Req() req) {
    return res.render('personnel', {
      user: req.user,
      allSetting: await this.personnelService.allSetting(),
    });
  }

  @Post('list')
  async allPersonnel() {
    const allPersonnel = await this.personnelService.findAll();
    const dataArray = [];
    allPersonnel.forEach(function (key, value) {
      const simple = {
        name: key.name,
        startdate: key.startdate,
        enddate: key.enddate,
        isactive: key.isactive,
        id: key.id,
      };

      dataArray.push(simple);
    });

    return {
      data: dataArray,
    };
  }

  @Post('add')
  create(@Body() createPersonnelDto: CreatePersonnelDto) {
    return this.personnelService.create(createPersonnelDto);
  }

  @Post('update')
  findandfetch(@Body('id') id: string) {
    return this.personnelService
      .findOne(id)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        return e;
      });
  }

  @Patch('update')
  update(@Body() UpdatePersonnelDto: UpdatePersonnelDto) {
    return this.personnelService.update(UpdatePersonnelDto);
  }

  @Post('isActive')
  isActive(@Body('id') id: string, @Body('data') data: boolean) {
    return this.personnelService.isActive(id, data);
  }

  @Delete('delete')
  remove(@Body('id') id: string) {
    return this.personnelService.remove(id);
  }
}
