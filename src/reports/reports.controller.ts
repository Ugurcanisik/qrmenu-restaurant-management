import { Controller, Get, Post, Body,  Res, Req} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportsController {

  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async index(@Res() res, @Req() req) {
    return res.render(
      'reports',
      {
        allTypeExpenses: await this.reportsService.allTypeExpenses(),
        user:req.user,
        allSetting: await this.reportsService.allSetting(),
      }
      )
  }


  @Post('query')
  async create(@Body() createReportDto: CreateReportDto) {

    if(createReportDto.date=='' || createReportDto.type=='' || createReportDto.type=="0"){

      return {data:''}

    }else{

     

      const type = createReportDto.type

  
  
      const date = createReportDto.date.split('/')
      const start = date[0]
      const end = date[1]

      let result = null
      const dataArray = []
  
      
      if(type=='gelir' || type=='gider'){
 
  
        if(type=='gelir'){

           result = await this.reportsService.ciroBetween(start,end)

           let total = 0

           result.forEach(function(key,value){
            let simple = {
              date:key.date.split(' ')[0],
              total:key.total, 
            }

            total+=parseInt(key.total)
      
            dataArray.push(simple)
          })

          dataArray.push({date:'Toplam', total: total})


        }else if(type=='gider'){

           result = await this.reportsService.expensesBetween(start,end)

           let total = 0

          
           result.forEach(async function(key,value){

            let simple = {
              type: key.TypeExpense_name,
              total:key.sum, 
            }

            total+=parseInt(key.sum)

            dataArray.push(simple)
          })


          dataArray.push({type:'Toplam', total: total})

        }



    return {
      'data': dataArray
    }


  
      }else{

        let total = 0

        const dataArray = []
  
        const result = await this.reportsService.typeBetween(type,start,end)

        result.forEach(function(key,value){
          let simple = {
            date:key.date.trim(),
            total:key.total, 
          }

          total+=key.total
    
          dataArray.push(simple)
        })


        dataArray.push({date:'Toplam', total:total})


            return {
                'data': dataArray
        }
  
      }
    }



    
  }

 
}
