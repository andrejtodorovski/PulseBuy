<script lang="ts">
    import WishlistRepository from "../../repository/wishlistRepository";
    import { toasts } from "svelte-toasts";
    import { isUserLogged, isUserLoggedIn } from "../../helpers/helpers";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import ProductsRepository from "../../repository/productsRepository";
    import CartRepository from "../../repository/cartRepository";
    import type { Cart } from "../../models/cart";
    import CartItemRepository from "../../repository/cartItemRepository";
    import { CreateCartItemDto } from "../../models/cart-item";

    /** @type {import('./$types').PageData} */
    export let data;
    let items = [];
    let cart: Cart;

    onMount(async () => {
        isUserLoggedIn() || goto('/login');
        let userId : string =  localStorage.getItem('userId') ?? '';
        const cartResponse = await CartRepository.getCartByUser(userId);
        cart = await cartResponse.json();
        await load()
    })

    async function load() {
        const userId = localStorage.getItem('userId') //TODO() andrej
        const res = await WishlistRepository.getWishlistForUserId(userId!!)
        const response = await res.json()

        if (res.ok) {
            items = response
        } else {
            toasts.error(response.message)
        }
    }

    async function removeFromWishlist(itemId: string) {
        const res = await WishlistRepository.removeFromWishlist(itemId)
        if (res.ok) {
            toasts.success('Item removed from wishlist.')
            await load()
        } else {
            const error = await res.json()
            toasts.error(error.message)
        }
    }

    async function addToCart(productId: number) {
        let  createCartItemDto = new CreateCartItemDto(
            cart.id,
            productId,
            1
        );

        try {
            const res = await CartItemRepository.createCartItem(createCartItemDto);
            if (res.ok) {
                toasts.success('Product added to cart');
                await load();
            } else {
                const errorMessage = await res.json();
                toasts.error(errorMessage.message);
            }
        } catch (err) {
            toasts.error('An error occurred while adding product to cart.');
        }
    }


</script>

<div class="products container">
    <div class="d-flex justify-content-center align-items-center p-5 flex-column">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-heart"
             viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        </svg>
        <h2>My Wishlist</h2>
    </div>

    <div class="row">
        {#if items.length > 0}
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each items as item}
                        <tr>
                            <td>
                                <img src="{item.product.imageURL}" alt="{item.product.name}"
                                     class="img-thumbnail me-5"
                                     style="max-width: 100px;">
                                {item.product.name}</td>
                            <td>{item.product.price}</td>
                            <td>TBD</td>
                            <td>
                                <button class="btn btn-danger btn-sm" type="button" on:click={() => removeFromWishlist(item.id)}>Remove</button>
                                <button class="btn btn-primary btn-sm" type="button" on:click={() => addToCart(item.product.id)}>Move to Cart</button>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>

        {:else}
            <div class="alert alert-info mt-4" role="alert">
                Your wishlist is empty.
            </div>
        {/if}
    </div>
</div>

<style>
    td {
        vertical-align: middle;
    }
</style>