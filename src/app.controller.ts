import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { AppService } from './app.service';
import { AuthService } from "./auth/auth.service";
import { cookieCheck } from './auth/auth.check'

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private authService: AuthService
    ) {

    }




  @Get()
  async index(@Res() res){


      res.render('qr',
      {
        allCategoryQr: await this.appService.allCategoryQr(),
        allProductsQr: await this.appService.allProductsQr(),
        allSetting: await this.appService.allSetting()
      }
      )
  }



  @Get('login')
  loginIndex(@Res() res, @cookieCheck() cookieCheck){
    if(cookieCheck){
      res.redirect('/dashboard')
    }else{
      res.render('login')
    }
  }


  @Post('login')
  async login(@Body() body, @Res({passthrough: true}) res){
    const token = await this.authService.validateUser(body)

      if(token['status']!=404){
      res.cookie('auth',token, {maxAge: 60*60*24*1000})
      return true
      }else{
      return false
      }
  }


  @Get('logout')
  async logout(@Res() res, @cookieCheck() cookieCheck){
    if(cookieCheck){
      await res.clearCookie('auth')
      res.redirect('/')
    }else{
      res.render('login')
    }
  }

}
