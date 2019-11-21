import { productModel } from '../src/module/model/productSchema';
import mockingoose from 'mockingoose';

describe('product Schema test', () => {
    it('should initialize', async () => {
        const mockProduct = {
            "productId": "00001",
            "name": "Dipirona",
            "industry": "neo quimica",
            "price": "14.53",
            "quantity": "100",
            
        }
        const checker = new productModel(mockProduct);
        mockingoose(productModel).toReturn({}, 'save');
        await checker.save();
    });
})