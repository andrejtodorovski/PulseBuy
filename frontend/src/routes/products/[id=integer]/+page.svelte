<script lang="ts">
    import {onMount} from 'svelte';
    import type {Product} from "../../../models/products";
    import {page} from "$app/stores";
    import ProductsRepository from "../../../repository/productsRepository";

    let product: Product | undefined;

    onMount(async () => {
        const productId = $page.params.id;

        ProductsRepository.fetchProductById(productId).then((data) => {
            data.json().then((productData) => {
                product = productData;
            });
        });
    });
</script>

<div class="product-details">
    <div class="product-image">
        <img src={product?.imageURL} alt={product?.name}/>
    </div>
    <div class="product-info">
        <h1>{product?.name}</h1>
        <p class="category">Category: {product?.category.name}</p>
        <p class="description">{product?.description}</p>
        <p class="price">Price: ${product?.price}</p>
        <p class="quantity">Quantity: {product?.quantity}</p>
    </div>
</div>

<style>
    @import "./style.css";
</style>