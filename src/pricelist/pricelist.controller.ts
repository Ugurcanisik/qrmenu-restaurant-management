import { Controller, Get, Post, Body, Patch, Delete, Res, Req, UsePipes } from '@nestjs/common';
import { PricelistService } from './pricelist.service';
import { CreatePricelistDto } from './dto/create-pricelist.dto';
import { UpdatePricelistDto } from './dto/update-pricelist.dto';
import { JoiValidationPipe } from 'src/joi.validator';
import addPricelistValid from './dto/validators/add.pricelist.valid';
import updatePricelistValid from './dto/validators/update.pricelist.valid';

@Controller('pricelist')
export class PricelistController {
  constructor(private readonly pricelistService: PricelistService) {}

  @Get()
  async index(@Res() res, @Req() req) {
    return res.render(
      'pricelist',
      {
        user: req.user,
        allSetting: await this.pricelistService.allSetting(),
      }
    )
  }

  @Post('add')
  @UsePipes(new JoiValidationPipe(addPricelistValid)) 
  create(@Body() CreatePricelistDto: CreatePricelistDto) {
    return this.pricelistService.create(CreatePricelistDto)
  }

  @Post('list')
  async allPricelist(){
    
    const  allPricelist = await this.pricelistService.findAll()
    const dataArray = []

    allPricelist.forEach(function(key,value){

      let simple = {
        name:key.name,
        price:key.price,
        id:key.id
      }

      dataArray.push(simple)
    })

    return {
      'data': dataArray
    }

  }


  @Post('update')
  findandfetch(@Body('id') id: string){
    return this.pricelistService.findOne(id)
    .then((result)=>{
      return result
    })
    .catch((e)=>{
      return e
    })
  }


  @Patch('update')
  @UsePipes(new JoiValidationPipe(updatePricelistValid)) 
  update(@Body() UpdatePricelistDto: UpdatePricelistDto) {
    return this.pricelistService.update(UpdatePricelistDto)
  }

  @Delete('delete')
  remove(@Body('id') id: string) {
    return this.pricelistService.remove(id);
  }



  
}
