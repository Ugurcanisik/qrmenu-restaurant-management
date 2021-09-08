
import { Personnel } from "src/personnel/entities/personnel.entity"
import { TypeExpense } from "../entities/type.expense.entity"

export class CreateExpenseDto {

    readonly typeexpense: TypeExpense[]
    readonly description?:string
    readonly personnel?: Personnel[]
    readonly total:number
    readonly date:string
    readonly id?:string

}
