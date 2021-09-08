import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { getConnection, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import seoUrl  from '../function/function'
import { UsersService } from 'src/users/users.service';
import { SettingsService } from 'src/settings/settings.service';


@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private ProductRespository: Repository<Product>, 
    private readonly CategoryService: CategoriesService,
    private readonly SettingsService: SettingsService
    ) {}

  async findAll(){
    return await this.ProductRespository.find({
      relations: ['categoryid'],
      where: {
        deleted: false
      }
    })
  }


  allSetting(){
    return this.SettingsService.findAll()
  }


  async create(createProductDto: CreateProductDto) {
    const newProduct = this.ProductRespository.create(createProductDto)
    return await this.ProductRespository.save(newProduct)
  }


  findOne(id: string): Promise<CreateProductDto> {
    return  this.ProductRespository.findOne({relations: ['categoryid'],where:{id:id, deleted:false}})
  }

  async findproducts(id){
    return await this.ProductRespository.find({ relations: ['categoryid'], where: {categoryid: id, deleted: false}, order:{order: 'ASC'}})
  }


  async update(updateProductDto: UpdateProductDto) {
    return this.ProductRespository.update(updateProductDto.id, updateProductDto)
  }

  isActive(id: string, data: boolean){
    return this.ProductRespository.update(id,{isActive:data})
  }

  orders(id: string, order: number){
    return getConnection().createQueryBuilder().update(Product).set({order :order}).where({id:id}).andWhere(`(order != ${order} )`).execute()
  }

  remove(id: string) {
    return this.ProductRespository.update(id,{deleted:true})
  }

  findAlls(id: string){
    return this.ProductRespository.find({where:{categoryid:id, deleted:false, isActive:true},order:{order:'ASC'}})
  }



  async allProductsQr(){

    const kategori = await this.CategoryService.findAll()

    let productsArray = []
    




    for (let index = 0; index < kategori.length; index++) {
   
      const id = kategori[index].id;
      const name = kategori[index].name
      let products = await  this.findAlls(id)

      


      let find = {
        categoryName: name,
        categorySeoUrl: seoUrl(name),
        allProducts: products
      }

      
      productsArray.push(find)
      
    }




return productsArray
  
  }



}
