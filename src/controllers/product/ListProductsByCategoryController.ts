import { Request, Response } from "express";
import { ListProductsByCategoryService } from "../../services/product/ListProductsByCategoryService";

class ListProductsByCategoryController {
    async handle(req: Request, res: Response) {
        const { category_id } = req.query;

        const listProductsByCategoryService = new ListProductsByCategoryService();
        const products = await listProductsByCategoryService.execute({
            category_id: category_id as string
        });

        return res.json(products);
    }
}

export { ListProductsByCategoryController };
