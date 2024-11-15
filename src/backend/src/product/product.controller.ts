import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get("sorted-for-restocking")
  findForRestocking() {
      return this.productService.findAllSortedForRestocking();
  }

  @Get("/featured")
  findFeatured() {
    return this.productService.findFeatured();
  }

  @Get("by-category/:categoryId")
  findAllByCategoryId(@Param("categoryId") categoryId: string) {
    return this.productService.findAllByCategoryId(+categoryId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id/stock")
  updateStock(@Param("id") id: string, @Body("numberInStock") numberInStock: number) {
    return this.productService.updateStock(+id, numberInStock);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
