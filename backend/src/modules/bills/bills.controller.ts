import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BillsService } from './bills.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Controller('bills')
@UseGuards(AuthGuard)
export class BillsController {
  constructor(private billsService: BillsService) {}

  @Get()
  getBill() {
    return { msg: 'get bills' };
  }

  // Source: https://docs.nestjs.com/techniques/file-upload#file-upload
  @Post('upload')
  @UseInterceptors(FileInterceptor('billImage'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // TODO: add file upload limit > 5MB
    // TODO: handle upload multiple images

    return this.billsService.addBill(file.buffer.toString('base64'));
  }
}
