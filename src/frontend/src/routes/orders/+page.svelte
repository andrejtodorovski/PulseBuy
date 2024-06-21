<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import CartRepository from '../../repository/cartRepository';
    import CartItemRepository from '../../repository/cartItemRepository';
    import type { CartWithCartItems } from '../../models/cart';
    import { getUserId, isUserCustomer } from '../../helpers/helpers';
    import { goto } from "$app/navigation";

    const orderedCarts = writable<CartWithCartItems[]>([]);

    async function loadOrderedCarts() {
        const userId = getUserId()!;
        if (!userId) return;

        const response = await CartRepository.getCartByUserOrdered(userId);
        const carts = await response.json();

        const cartsWithItemsPromises = carts.map(async (cart) => {
            const cartItemsResponse = await CartItemRepository.getCartItemsByCartId(cart.id.toString());
            const cartItems = await cartItemsResponse.json();
            return {...cart, cartItems};
        });

        const cartsWithItems = await Promise.all(cartsWithItemsPromises);
        orderedCarts.set(cartsWithItems);
    }

    onMount(async () => {
        if (!isUserCustomer()) {
            await goto("/unauthorized")
        } else {
            await loadOrderedCarts();
        }
    });
</script>
<div class="container">
    {#if $orderedCarts.length > 0}
        {#each $orderedCarts as cart, index (cart.id)}
            <h2>Order #{index + 1}</h2>
            <table>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {#each cart.cartItems as item}
                    <tr>
                        <td><img src={item.product.imageURL} alt={item.product.name}> {item.product.name}</td>
                        <td>{item.product.description}</td>
                        <td>{item.quantity}</td>
                        <td>${item.product.price}</td>
                        <td>${(item.quantity * parseFloat(item.product.price.toString())).toFixed(2)}</td>
                    </tr>
                {/each}
                </tbody>
            </table>
        {/each}
    {:else}
        <p>No orders found.</p>
    {/if}
</div>
<style>
    @import './style.css';
</style>
