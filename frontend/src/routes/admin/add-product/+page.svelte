<script lang="ts">

    import {CreateProductDto} from "../../../models/products";
    import ProductsRepository from "../../../repository/productsRepository";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { isUserLogged } from '../../../helpers/helpers';

    export let data: any

    let createProductDto = new CreateProductDto();

    onMount(async () => {
        $isUserLogged || goto('/login');
    });
    const addProduct = async () => {
        try {
            const res = await ProductsRepository.addNewProduct(createProductDto);

            if (res.ok) {
                message = "Product was added successfully!";
                goto('/products');
            }
        } catch (err) {
            error = "RES001: An error occurred.";
        }
    };
</script>

<svelte:head>
    <title>Add Product</title>
</svelte:head>

<div class="container center-kids mt-4">
    <div class="custom-card rounded-lg border border-gray-200 shadow-md w-50 padding-form">
        <form on:submit|preventDefault={addProduct}>
            <div class="d-flex align-items-center mb-3">
                <h3 class="text-xl font-medium">Add New Product</h3>
            </div>
            <div class="form-group">
                <label for="productName">Product Name:</label>
                <input type="text" class="form-control" id="productName" bind:value={createProductDto.name}/>
            </div>

            <div class="form-group">
                <label for="productPrice">Product Price:</label>
                <input type="number" step="0.01" class="form-control" id="productPrice"
                       bind:value={createProductDto.price}/>
            </div>

            <div class="form-group">
                <label for="productDescription">Product Description:</label>
                <textarea class="form-control" id="productDescription" bind:value={createProductDto.description}/>
            </div>

            <div class="form-group">
                <label for="productImage">Product Image:</label>
                <input type="text" class="form-control" id="productImage" bind:value={createProductDto.imageURL}/>
            </div>

            <div class="form-group">
                <label for="productCategory">Product Category:</label>
                <select class="form-select" id="productCategory" bind:value={createProductDto.categoryId}>
                    {#each data.categories as category}
                        <option value={category.id}>{category.name}</option>
                    {/each}
                </select>
            </div>

            <div class="form-group">
                <label for="productNumberInStock">Number in stock:</label>
                <input type="number" step="1" class="form-control" id="productNumberInStock"
                       bind:value={createProductDto.numberInStock}/>
            </div>

            <button type="submit" class="btn btn-primary mt-2">Add Product</button>
        </form>
    </div>
</div>
