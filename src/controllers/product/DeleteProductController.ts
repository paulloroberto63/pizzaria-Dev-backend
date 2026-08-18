import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";
class DeleteProductController {
    async handle(req: Request, res: Response) {
        const product_Id = req.query?.product_Id as string;

        const deleteProduct = new DeleteProductService();

        const product = await deleteProduct.execute({ product_Id: product_Id });
        
        
        return res.status(200).json(product);
    }
}

export { DeleteProductController };