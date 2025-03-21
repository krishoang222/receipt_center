import { Controller, Post } from '@nestjs/common';
import { BillsService } from './bills.service';

@Controller('bills')
export class BillsController {
  constructor(private billsService: BillsService) { }

  // (temp) route for trigger testing
  @Post()
  addBill() {
    return this.billsService.addBill();
  }
}
