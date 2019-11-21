import { ProductController } from '../src/module/product/product.controller';
import { ProductService } from '../src/module/product/product.service';
import { Response } from 'express';
import { ProductArgs} from '../src/module/product/repositories/product.entity';


export const response = {
    status: (status) => ({json: () => null}),
} as Response;
const mockProductArgs = {
    "name": "Sorine",
    "industry": "neoquimica",
    "price": '17.93',
    "quantity": '10'
    
} as ProductArgs;

const mockParams = {};

const mockService = {
    register: () => Promise.resolve({}),
    search: () => Promise.resolve({}),
}
describe('Product Controller', () => {
    let controller: ProductController;
    let service: ProductService;

    beforeEach(() => {
        service = mockService as any;
        controller = new ProductController(service);
    });

    describe('List operation cases', () => {
        it('should have instance controller', () => {
            expect(controller).toBeTruthy();
        });

        it('should test register', () => {
            expect(() => {
                controller.register(response, mockProductArgs);
            }).not.toThrow();
        });

        it('should test search', () => {
            expect(() => {
                controller.search(response, mockParams);
            }).not.toThrow();
        });
    });

});