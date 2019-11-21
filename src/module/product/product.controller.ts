import { Controller, Post, Get, Res, HttpStatus, Body, Param, NotFoundException, HttpCode, Req } from '@nestjs/common';
import { Response} from 'express';
import { HttpResponse } from '../../utils/http.response';
import { Status } from '../../utils/status.entity';
import { ProductService } from './product.service';
import { ProductArgs } from './DTO/product.entity';

@Controller('product')
export class ProductController {

    constructor(private readonly service: ProductService) { }

    @Post('create')
    public async register(@Res() res: Response, @Body() filter: ProductArgs): Promise<Response> {
        let data;
        try {
            data = await this.service.register(filter);
            return res.status(HttpStatus.OK).json(
                new HttpResponse(new Status(HttpStatus.OK), data));
        } catch (err) {
            switch(err.code) {
                case 11000:
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                        new HttpResponse(new Status(HttpStatus.INTERNAL_SERVER_ERROR, 'Produto já existente.')));
                default:
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                        new HttpResponse(new Status(HttpStatus.INTERNAL_SERVER_ERROR, err.errmsg)));
            }
        }
    }


    @Get('search/:productId')
    public async search(@Res() res: Response, @Param() params): Promise<Response> {
        let data;
        try {
            data = await this.service.search({...params });
            return res.status(HttpStatus.OK).json(
                new HttpResponse(new Status(0), data));
        } catch (err) {
            switch(err.code) {
                case 401:
                    return res.status(HttpStatus.UNAUTHORIZED).json(
                        new HttpResponse(new Status(HttpStatus.UNAUTHORIZED, err.errmsg)));
                default:
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
                        new HttpResponse(new Status(HttpStatus.INTERNAL_SERVER_ERROR, err.errmsg)));
            }
        }
    }

}