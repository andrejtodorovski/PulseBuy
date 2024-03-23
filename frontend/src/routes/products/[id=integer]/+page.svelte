<script lang="ts">
    import {onMount} from 'svelte';
    import type {Product} from "../../../models/products";
    import {page} from "$app/stores";
    import ProductsRepository from "../../../repository/productsRepository";
    import { goto } from '$app/navigation';
    import { isUserLogged, isUserLoggedIn } from '../../../helpers/helpers';

    let product: Product | undefined;

    onMount(async () => {
        isUserLoggedIn() || goto('/login');
        const productId = $page.params.id;

        ProductsRepository.fetchProductById(productId).then((data) => {
            data.json().then((productData) => {
                product = productData;
            });
        });
    });
</script>
{#if product}
<div class="product-details">
    <div class="product-image">
        <img src={product?.imageURL} alt={product?.name}/>
    </div>
    <div class="product-info">
        <h1>{product?.name}</h1>
        <p class="category">Category: {product?.category.name}</p>
        <p class="description">{product?.description}</p>
        <p class="price">Price: ${product?.price}</p>
    </div>
</div>
{/if}
<style>
    @import "./style.css";
</style>