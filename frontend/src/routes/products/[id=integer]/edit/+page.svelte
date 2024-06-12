<script lang="ts">

    import type {Product} from "../../../../models/products";
    import {UpdateProductDto} from "../../../../models/products";
    import ProductsRepository from "../../../../repository/productsRepository";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import type {PageData} from "../../../$types";
    import { isUserAdmin } from "../../../../helpers/helpers";

    export let data: PageData;

    let error;

    let updateProductDto: UpdateProductDto | undefined;

    let product: Product | undefined;

    let productId: string | undefined;

    let message: string | undefined;

    onMount(async () => {
        if (!isUserAdmin()) {
            await goto("/unauthorized")
        } else {
            productId = $page.params.id;

            ProductsRepository.fetchProductById(productId).then((data) => {
                data.json().then((productData) => {
                    product = productData;
                    updateProductDto = new UpdateProductDto(productData)
                });
            });
        }
    });

    const updateProduct = async () => {
        if (updateProductDto && productId) {
            ProductsRepository.updateProduct(updateProductDto, productId).then((data) => {
                if (data.ok) {
                    message = "Product updated successfully";
                    setTimeout(() => {
                        goto(`/products/${productId}`);
                    }, 2000);
                } else {
                    error = "Failed to update product";
                }
            });
        }
    };
</script>

<svelte:head>
    <title>Add Product</title>
</svelte:head>

<div class="container mt-4 w-80">
    {#if updateProductDto}
        <div class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md w-full">
            <form on:submit|preventDefault={updateProduct}>
                <div class="d-flex align-items-center mb-3">
                    <h2 class="text-xl font-medium">Add New Product</h2>
                </div>
                <div class="form-group">
                    <label for="productName">Product Name:</label>
                    <input type="text" class="form-control" id="productName" bind:value={updateProductDto.name}/>
                </div>

                <div class="form-group">
                    <label for="productPrice">Product Price:</label>
                    <input type="number" step="0.01" class="form-control" id="productPrice"
                           bind:value={updateProductDto.price}/>
                </div>

                <div class="form-group">
                    <label for="productDescription">Product Description:</label>
                    <textarea class="form-control" id="productDescription" bind:value={updateProductDto.description}/>
                </div>

                <div class="form-group">
                    <label for="productImage">Product Image:</label>
                    <input type="text" class="form-control" id="productImage" bind:value={updateProductDto.imageURL}/>
                </div>

                <div class="form-group">
                    <label for="productCategory">Product Category:</label>
                    <select class="form-select" id="productCategory" bind:value={updateProductDto.categoryId}>
                        {#each data.categories as category}
                            <option value={category.id}>{category.name}</option>
                        {/each}
                    </select>
                </div>

                <button type="submit" class="btn btn-primary mt-2">Add Product</button>
            </form>
        </div>
    {/if}
</div>
