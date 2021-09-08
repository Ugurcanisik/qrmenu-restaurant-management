import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadRequestException, UsePipes, Req } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { date } from 'src/date';
import addExpensesValid from './dto/validators/add.expenses.valid'
import updateExpensesValid from './dto/validators/update.expenses.valid'
import { JoiValidationPipe } from 'src/joi.validator';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  async index(@Res() res, @Req() req) {
    // console.log(date.fullDateTime())
    return res.render(
      'expenses',
      {
        typeExpense: await this.expensesService.findAllTypeExpenses(),
        user: req.user,
        allPersonnel: await this.expensesService.allPersonnel(),
        allSetting: await this.expensesService.allSetting(),
      }
      )
  }

  @Post('list')
  async allExpenses(){
    const  allExpenses = await this.expensesService.findAll()
    const dataArray = []



    allExpenses.forEach(function(key,value){

      let simple = {
        date:key.date,
        total:key.total,
        type:key.typeexpense['name'], 
        id:key.id
      }

      dataArray.push(simple)
    })



   
    return {
      'data': dataArray
    }

  }


  @Post('addType')
  createType(@Body() typeName) {
    return this.expensesService.createTypeExpense(typeName)
    .then((result)=>{
      return result
    })
    .catch((e)=>{
      throw new BadRequestException('name must be unique');
    })
  }

  @Post('add')
  @UsePipes(new JoiValidationPipe(addExpensesValid)) 
  create(@Body() CreateExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(CreateExpenseDto);
  }

  @Post('update')
  findandfetch(@Body('id') id: string){
    return this.expensesService.findOne(id)
    .then((result)=>{
      return result
    })
    .catch((e)=>{
      return e
    })
  }





  @Patch('update')
  @UsePipes(new JoiValidationPipe(updateExpensesValid)) 
  update(@Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(updateExpenseDto);
  }


  @Post('details')
  async details(@Body('id') id:string){
    return await this.expensesService.findOne(id)
  }


  @Delete('delete')
  remove(@Body('id') id: string)  {
    return this.expensesService.remove(id);
  }
}
