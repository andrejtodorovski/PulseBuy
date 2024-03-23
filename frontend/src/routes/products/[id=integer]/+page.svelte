<script lang="ts">
    import {onMount} from 'svelte';
    import type {Product} from "../../../models/products";
    import {page} from "$app/stores";
    import ProductsRepository from "../../../repository/productsRepository";
    import { goto } from '$app/navigation';
    import { isUserLoggedIn } from '../../../helpers/helpers';
    import { CreateCartItemDto } from "../../../models/cart-item";
    import CartItemRepository from "../../../repository/cartItemRepository";
    import CartRepository from "../../../repository/cartRepository";
    import type { Cart } from "../../../models/cart";
    import { toasts}  from "svelte-toasts";

    let cart : Cart;
    let product: Product | undefined;
    let  createCartItemDto = new CreateCartItemDto();
    const productId = $page.params.id;

    onMount(async () => {
        isUserLoggedIn() || goto('/login');

        ProductsRepository.fetchProductById(productId).then((data) => {
            data.json().then((productData) => {
                product = productData;
            });
        });
        let userId : string =  localStorage.getItem('userId') ?? '';
        const cartResponse = await CartRepository.getCartByUser(userId);
        cart = await cartResponse.json();
    });
    const addToCart = async () => {
        createCartItemDto.productId = Number(productId);
        createCartItemDto.cartId = cart.id;


        try {

            const res = await CartItemRepository.createCartItem(createCartItemDto);
            if (res.ok) {
                toasts.success('Product added to cart');
            } else {
                toasts.error('An error occurred while adding product to cart.');
            }
        } catch (err) {
            toasts.error('An error occurred while adding product to cart.');
        }
    };

    const goBack = () => {
        goto('/products');
    };
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
    <div class="add-to-cart">
        <h3 class="text-xl font-medium">{product.name}</h3>
        <p>Price: ${product.price}</p>
        <label for="quantity">Quantity:</label>
        <input type="number" min="1" class="form-control" id="quantity" bind:value={createCartItemDto.quantity} />

        <button class="btn btn-primary mt-2" on:click|preventDefault={addToCart}>Add to Cart</button>
    </div>
</div>
{/if}
<style>
    @import "./style.css";
</style>