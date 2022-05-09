import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UUIDValidationPipe } from 'src/pipes/uuid-validation.pipes';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getBooks(@Query() filter: FilterBookDto): Promise<Book[]> {
    return this.booksService.getBooks(filter);
  }

  @Get('/:id')
  async getBook(@Param('id', UUIDValidationPipe) id: string): Promise<Book> {
    return await this.booksService.getBookById(id);
  }

  @Post()
  // @UsePipes(ValidationPipe)
  async createBook(@Body() payload: CreateBookDto): Promise<void> {
    return this.booksService.createBook(payload);
  }

  @Put('/:id')
  async updateBook(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() payload: UpdateBookDto,
  ): Promise<void> {
    return await this.booksService.updateBook(id, payload);
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    return await this.booksService.deleteBook(id);
  }
}
