<script lang="ts">

    import {CreateProductDto} from "../../../models/products";
    import type {PageData} from "./$types"
    import ProductsRepository from "../../../repository/productsRepository";

    export let data: PageData

    let error;
    let createProductDto = new CreateProductDto();

    let message: string | undefined;

    const addProduct = async () => {
        try {
            const res = await ProductsRepository.addNewProduct(createProductDto);

            if (res.ok) {
                message = "Product was added successfully!";
            }
        } catch (err) {
            error = "RES001: An error occurred.";
        }
    };
</script>

<svelte:head>
    <title>Add Product</title>
</svelte:head>

<div class="container mt-4">
    <h2 class="mb-4">Add Product</h2>

    <form on:submit|preventDefault={addProduct}>
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
            <label for="productQuantity">Product Quantity:</label>
            <input type="number" step="1" class="form-control" id="productQuantity"
                   bind:value={createProductDto.quantity}/>
        </div>

        <div class="form-group">
            <label for="productCategory">Product Category:</label>
            <select class="form-control" id="productCategory" bind:value={createProductDto.categoryId}>
                {#each data.categories as category}
                    <option value={category.id}>{category.name}</option>
                {/each}
            </select>

            <button type="submit" class="btn btn-primary">Add Product</button>
    </form>
</div>

<style>
    a {
        text-decoration: none;
    }
</style>
