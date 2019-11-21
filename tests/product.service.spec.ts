import { ProductService } from '../src/module/product/product.service';
import { JwtService } from '@nestjs/jwt';
import mockingoose from 'mockingoose';
import { productModel } from '../src/module/model/productSchema';
import { ProductArgs, ProductSearch } from '../src/module/product/DTO/product.entity';

const mockJwt = {
    register: () => {}
};
const mockProductArgs = {
    "name": "Sorine",
    "industry": "neoquimica",
    "price": '17.93',
    "quantity": '10'

} as ProductArgs;


const mockParams = {
    productId: '123',
} as ProductSearch;

const mockProduct = {
    "productId": "123",
    "name": "Dipirona",
    "industry": "neoquimica",
    "price": "14,53",
    "quantity": "100",
    "date_added": new Date(),
    "date_update": new Date(),
    
}

const finderMock = query => {
    return [mockProduct];
};
const saveMock = query => {
    return [mockProduct];
};

describe('Product Service', () => {
    let service: ProductService;
    let jwtService: JwtService;

    beforeEach(() => {
        jwtService = mockJwt as any;
        service = new ProductService(jwtService);
        mockingoose(productModel).toReturn(saveMock, 'save');
        mockingoose(productModel).toReturn(finderMock, 'find');
        mockingoose(productModel).toReturn(finderMock, 'findOneAndUpdate');
    });

    describe('List operation cases', () => {
        it('should have instance service', () => {
            expect(service).toBeTruthy();
        });

        it('should test register', async () => {
            expect(await service.register(mockProductArgs)).toBeTruthy();
        });

        it('should test search', async () => {
            expect(await service.search(mockParams)).toBeTruthy();
        });

    })

})