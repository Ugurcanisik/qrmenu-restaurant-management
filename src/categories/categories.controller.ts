import { Controller, Get, Post, Body, Patch, Delete, Res, BadRequestException, UsePipes, UnprocessableEntityException, Req } from '@nestjs/common';
import { JoiValidationPipe } from 'src/joi.validator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import addCategoryValidate from './dto/validators/add.category.valid'
import updateCategoryValid from './dto/validators/update.category.valid'


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


  @Get()
  async index(@Res() res, @Req() req) {
    res.render('categories',
    {
      user: req.user,
      allSetting: await this.categoriesService.allSetting(),
    })
  }

  @Post('add')
  @UsePipes(new JoiValidationPipe(addCategoryValidate)) 
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto)
    .then((result)=>{
      return result
    })
    .catch((e)=>{
      throw new UnprocessableEntityException('name must be unique');
    })
  }


  @Post('list')
  async allCategory(){
    const  categories = await this.categoriesService.findAll()
    const dataArray = []
    categories.forEach(function(key,value){
      let simple = {
        'DT_RowId':key.id,
        name:key.name,
        id: key.id,
        isactive:key.isactive,
      }

      dataArray.push(simple)
    })


    return {
      'data': dataArray
    }

  }

  @Post('update')
  findandfetch(@Body('id') id: string){
    return this.categoriesService.findOne(id)
    .then((result)=>{
      return result
    })
    .catch((e)=>{
      return e
    })
  }

  @Patch('update')
  @UsePipes(new JoiValidationPipe(updateCategoryValid)) 
  update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(updateCategoryDto)
    .then((result)=>{
      return result
    })
    .catch((e)=>{
      throw new BadRequestException('name must be unique');
    })
  }

  @Delete('delete')
  remove(@Body('id') id: string)  {
    return this.categoriesService.remove(id);
  }

  @Post('isActive')
  isActive(@Body('id') id: string, @Body('data') data: boolean) {
    return this.categoriesService.isActive(id,data)
  }


  @Post('orders')
  Orders(@Body('data') data){
    let x = 0
    for(let i = 0; i < data.length; i++){
      this.categoriesService.orders(data[i],x)
          x++
		}
    return true
  }

}
