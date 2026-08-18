import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateUserController } from "./controllers/user/createUserController";
import { validadeSchema } from "./middlewares/validadeSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController"
import { isAdmin } from "./middlewares/isAdmin";
import { CreateCategorySchema } from "./schemas/categorySchema";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductsController } from "./controllers/product/ListProductsController";
import { ListProductsByCategoryController } from "./controllers/product/ListProductsByCategoryController";
import { productSchema, listProductsSchema, listProductsByCategorySchema } from "./schemas/productSchema";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { createOrderSchema } from "./schemas/orderSchema";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { AddItemController } from "./controllers/order/AddItemController";
import { addItemSchema } from "./schemas/orderSchema";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { removeItemSchema } from "./schemas/orderRemoveSchema";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { detailOrderSchema } from "./schemas/orderDetailSchema";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { sendOrderSchema } from "./schemas/orderSchema";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { finishOrderSchema } from "./schemas/orderSchema";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";

const router = Router();
const upload = multer(uploadConfig);

router.post("/users", validadeSchema(createUserSchema), new CreateUserController().handle )
router.post("/session", validadeSchema(authUserSchema), new AuthUserController().handle )
router.get("/me", isAuthenticated, new DetailUserController().handle)

router.post("/category", isAuthenticated, isAdmin, validadeSchema(CreateCategorySchema), new CreateCategoryController().handle)
router.get("/category", isAuthenticated, new ListCategoriesController().handle)

router.post("/product", isAuthenticated, isAdmin, upload.single("file"), validadeSchema(productSchema), new CreateProductController().handle)
router.get("/products", isAuthenticated, validadeSchema(listProductsSchema), new ListProductsController().handle)
router.get("/category/product", isAuthenticated, validadeSchema(listProductsByCategorySchema), new ListProductsByCategoryController().handle)
router.post("/order", isAuthenticated, validadeSchema(createOrderSchema), new CreateOrderController().handle)
router.get("/orders", isAuthenticated, new ListOrdersController().handle)
router.delete("/product", isAuthenticated, isAdmin, new DeleteProductController().handle)
router.post("/order/add", isAuthenticated, validadeSchema(addItemSchema), new AddItemController().handle)
router.delete("/order/remove", isAuthenticated, validadeSchema(removeItemSchema), new RemoveItemController().handle)
router.get("/order/detail", isAuthenticated, validadeSchema(detailOrderSchema), new DetailOrderController().handle)
router.patch("/order/send", isAuthenticated, validadeSchema(sendOrderSchema), new SendOrderController().handle)
router.put("/order/finish", isAuthenticated, validadeSchema(finishOrderSchema), new FinishOrderController().handle)
router.delete("/order", isAuthenticated, new DeleteOrderController().handle)

export { router } 
