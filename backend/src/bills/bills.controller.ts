import { Controller, Get, Injectable } from '@nestjs/common';
import { BillsService } from './bills.service';

@Controller('bills')
export class BillsController {
  constructor(private billsService: BillsService) { }

  // (temp) route for trigger testing
  @Get()
  getBills() {
    return this.billsService.getBills();
  }
}
