//use service by using injectable decorator and use by calling it in constructor then it will get called as return object for all the class listed below


import { Controller, Get, Post, HttpCode, Delete, Put, Body, Redirect , Query, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  name: string;
  age: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getData')
  @Redirect('https://docs.nestjs.com', 302)
  getData(@Query('choice') choice:string) {    
    if (choice === 'ctrl') {
      Redirect('https://docs.nestjs.com/controllers')
      return { url: 'https://docs.nestjs.com/controllers' };
    }
    return 'This action returns all data' +" "+this.appService.getHello();
  }
  @Get('/getData/:id')
  findByParamId(@Param('id') params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} data`;
  }
  findById(@Param('id') id: any): string {
    return `This action returns a #${id} data`;
  }  

  @Post('/addData')
  @HttpCode(201)
  async addData(@Body() data: DataService): Promise<string> {
    if (data) {
    return  `${data.name} of age ${data.age} is added now`
    }
  }

  @Put('/updateData')
  UpdateData(): string {
    return 'This action will update data';
  }

  @Delete('/deleteData')
  deleteData(): string {
    return "Delete the data";
  }
}
