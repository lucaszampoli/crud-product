import { NotFoundException, HttpStatus, Injectable } from '@nestjs/common';
import { IsString } from 'class-validator';
import { ProductArgs, ProductSearch } from './DTO/product.entity';
import { productModel } from '../model/productSchema';
import { JwtService } from  '@nestjs/jwt';


@Injectable()
export class ProductService {

    private jwtService: JwtService;

    constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    private async getNewId() {
        try {
            const products: any = await productModel.find({}).sort({ _id: -1 }).limit(1);
            if (products.length > 0) {
                const seq = products? parseFloat(products[0].productId) + 1 : 1;
                return `0000${seq}`.slice(-5);
            } else {
                return `00001`;
            }
        } catch (err) {
            console.log(err);
            return '';
        }
    }

    public async register(filter: ProductArgs): Promise<any> | never {
        try {
            const product: any = await new productModel({
                productId: await this.getNewId(),
                name: filter.name,
                industry: filter.industry,
                price: filter.price,
                quantity: filter.quantity,
          
            }).save();
            return Promise.resolve({
                'productId': product.productId,
                'Nome': product.name,
                'Industria': product.industry,
                'Preço': product.price,
                'Quantidade': product.quantity,
                'Data_criacao': product.date_added,
                'Data_atualizacao': product.date_updade,

                
            });
        } catch (err) {
            throw err
        }
    }

    public async search(filter: ProductSearch): Promise<any> | never {
        try {
            const product: any = await productModel.find({'productId': { $regex: filter.productId }} ).sort({ _id: -1 }).limit(1);
            if(product.length > 0) {
                    return Promise.resolve({
                        'productId': product[0].productId,
                        'Nome': product[0].name,
                        'Industria': product[0].industry,
                        'Preço': product[0].price,
                        'Quantidade': product[0].quantity,
                        'Data_criacao': product[0].date_added,
                        'Data_atualizacao': product[0].date_update,
                    });
               
            } else {
                const errObj = {
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                    errmsg: 'Produto inexistente',
                }
                return Promise.reject(errObj);
            }
        } catch (err) {
            throw err;
        }
    }

}