import { Injectable } from '@nestjs/common';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';
import { SettingsService } from './settings/settings.service';

@Injectable()
export class AppService {




  constructor(
    private readonly categoriesService: CategoriesService, 
    private readonly productService: ProductsService,
    private readonly settingService: SettingsService,
    ){}

  allCategoryQr(){
    return this.categoriesService.allCategoryQr()
  }


  allSetting(){
    return this.settingService.findAll()
  }


  allProductsQr(){
    return this.productService.allProductsQr()
  }




}
