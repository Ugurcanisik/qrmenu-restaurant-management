import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Res,
  UsePipes,
  Req,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/joi.validator';
import { CiroService } from './ciro.service';
import { CreateCiroDto } from './dto/create-ciro.dto';
import { UpdateCiroDto } from './dto/update-ciro.dto';
import addCiroValid from './dto/validators/add.ciro.valid';
import updateCiroValid from './dto/validators/update.ciro.valid';
import { date } from 'src/date';

@Controller('ciro')
export class CiroController {
  constructor(private readonly ciroService: CiroService) {}

  @Get()
  async index(@Res() res, @Req() req) {
    return res.render('ciro', {
      today: date.fullDateTr(),
      user: req.user,
      allSetting: await this.ciroService.allSetting(),
    });
  }

  @Post('add')
  @UsePipes(new JoiValidationPipe(addCiroValid))
  create(@Body() CreateCiroDto: CreateCiroDto) {
    return this.ciroService.create(CreateCiroDto);
  }

  @Post('list')
  async allCiro() {
    const allCiro = await this.ciroService.findAll();
    const dataArray = [];

    allCiro.forEach(function (key, value) {
      const simple = {
        date: key.date.split(' ')[0],
        total: key.total,
        id: key.id,
      };

      dataArray.push(simple);
    });

    return {
      data: dataArray,
    };
  }

  @Post('update')
  findandfetch(@Body('id') id: string) {
    return this.ciroService
      .findOne(id)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        return e;
      });
  }

  @Patch('update')
  @UsePipes(new JoiValidationPipe(updateCiroValid))
  update(@Body() UpdateCiroDto: UpdateCiroDto) {
    return this.ciroService.update(UpdateCiroDto);
  }

  @Post('details')
  async details(@Body('id') id: string) {
    return await this.ciroService.findOne(id);
  }

  @Delete('delete')
  remove(@Body('id') id: string) {
    return this.ciroService.remove(id);
  }
}
