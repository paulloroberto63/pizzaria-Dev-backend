import { Request, Response } from "express";
import { RemoveItemOrderService } from "../../services/order/RemoveItemOrderService"

class RemoveItemController {
    async handle(req: Request, res: Response) {
        const { item_id } = req.query as { item_id: string };

        const removeItemOrderService = new RemoveItemOrderService();
        const deletedItem = await removeItemOrderService.execute({ item_id });

        return res.json(deletedItem);
    }
}

export { RemoveItemController };
