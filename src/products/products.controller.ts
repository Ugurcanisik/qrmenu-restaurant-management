import { Controller, Get, Post, Body, Patch, Delete, Res, UsePipes, UseInterceptors, Req, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { JoiValidationPipe } from 'src/joi.validator';
import addProductValid from './dto/validators/add.product.valid'
import updateProductValid from './dto/validators/update.product.valid'
import { FileInterceptor } from '@nestjs/platform-express';
require('dotenv/config')

const { Storage } = require('@google-cloud/storage');

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService, private readonly categoryService: CategoriesService) {}


  @Get()
  async index(@Res() res , @Req() req) {

    return res.render(
      'products',
      {
        allCategory: await this.categoryService.findAllOrderName(),
        allprod: await this.productsService.findAll(),
        user: req.user,
        allSetting: await this.productsService.allSetting(),
      })
  }



  @Post('list')
  async order(@Body('id') id: string){
    const allProducts = await this.productsService.findproducts(id)
    const productsArray = []
    allProducts.forEach( function(key,value){
      let simple = {
        DT_RowId:key.id,
        picture:key.picture,
        name:key.name,
        description: key.description.substr(0,30),
        price: key.price,
        id: key.id,
        isactive:key.isActive,
      }
      productsArray.push(simple)
    })


    return {
      data: productsArray
    }
  }


  @Post('add')
  @UsePipes(new JoiValidationPipe(addProductValid)) 
  @UseInterceptors(FileInterceptor('picture'))
  async create(@Body() createProductDto: CreateProductDto, @Req() req) {
    

    if(req.file != undefined){


      const type = req.file.mimetype
      const fileSize = req.file.size
  
      if(type != 'image/jpeg' && type != 'image/png'){
        throw new BadRequestException('img hatası')
      }
    
      if(fileSize>4194304){
        throw new BadRequestException('boyut hatası')
      }

  
    const storage = new Storage({
      keyFilename: './'+process.env.C_FILE,
      projectId: process.env.C_PROID,
    })

    const bucket = storage.bucket(process.env.C_BUCKET) 

    const { originalname, buffer } = req.file

    const random =  Math.floor(Math.random() * 100)

    const blob = bucket.file(random+originalname)

    const blobStream = blob.createWriteStream({
      resumable: false
    }).end(buffer)

    createProductDto.picture = random+originalname

    }

    const addProduct = JSON.parse(JSON.stringify(createProductDto))

    return await this.productsService.create(addProduct);
  }




  @Post('update')
  findandfetch(@Body('id') id: string){
    return this.productsService.findOne(id)
  }


  @Patch('update')
  @UsePipes(new JoiValidationPipe(updateProductValid)) 
  @UseInterceptors(FileInterceptor('picture'))
  async update(@Body() updateProductDto: UpdateProductDto, @Req() req) {


    
    if(req.file != undefined){

      
    const type = req.file.mimetype
    const fileSize = req.file.size

    if(type != 'image/jpeg' && type != 'image/png'){
      throw new BadRequestException('img hatası')
    }
  
    if(fileSize>2097152){
      throw new BadRequestException('boyut hatası')
    }
  


  

    const storage = new Storage({
      keyFilename:'./'+process.env.C_FILE,
      projectId: process.env.C_PROID,
    })

    const bucket = storage.bucket(process.env.C_BUCKET) 
  
      const { originalname, buffer } = req.file
  
      const random =  Math.floor(Math.random() * 100)
  
      const blob = bucket.file(random+originalname)
  
      const blobStream = blob.createWriteStream({
        resumable: false
      }).end(buffer)
  
      updateProductDto.picture = random+originalname

  
      } 

    const updateProduct = JSON.parse(JSON.stringify(updateProductDto));
    return await this.productsService.update(updateProduct);
  }








  @Post('isActive')
  isActive(@Body('id') id: string, @Body('data') data: boolean) {
    return this.productsService.isActive(id,data)
  }

  @Post('orders')
  Orders(@Body('data') data){
    let x = 0
    for(let i = 0; i < data.length; i++){
      this.productsService.orders(data[i],x)
          x++
		}
    return true
  }

  @Delete('delete')
  remove(@Body('id') id: string) {
    return this.productsService.remove(id);
  }
}
function next(err: any) {
  throw new Error('Function not implemented.');
}

