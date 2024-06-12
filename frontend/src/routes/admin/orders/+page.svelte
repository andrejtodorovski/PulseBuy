<script lang="ts">
    import { onMount } from "svelte";
    import { isUserAdmin } from "../../../helpers/helpers";
    import { goto } from "$app/navigation";
    import { writable } from "svelte/store";
    import type { CartWithCartItems } from "../../../models/cart";
    import CartRepository from "../../../repository/cartRepository";
    import CartItemRepository from "../../../repository/cartItemRepository";

    const allOrderedCarts = writable<CartWithCartItems[]>([]);

    async function fetchOrderedCarts() {
        const response = await CartRepository.getAllOrderedCarts();
        const orderedCarts = await response.json(); // Rename the variable to avoid conflict
        const cartsWithItemsPromises = orderedCarts.map(async (cart) => {
            const cartItemsResponse = await CartItemRepository.getCartItemsByCartId(cart.id.toString());
            const cartItems = await cartItemsResponse.json();
            return {...cart, cartItems};
        });

        const cartsWithItems = await Promise.all(cartsWithItemsPromises);
        allOrderedCarts.set(cartsWithItems); // Use the writable store correctly
        console.log(cartsWithItems);
    }

    onMount(async () => {
        if (!isUserAdmin()) {
            await goto("/unauthorized");
        } else {
            await fetchOrderedCarts();
        }
    });
</script>
<div class="main-container container">
    {#if $allOrderedCarts.length > 0}
        {#each $allOrderedCarts as cart, index (cart.id)}
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
        <h1>No orders found.</h1>
    {/if}
</div>
<style>
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    th, td {
        padding: 12px 15px;
        border: 1px solid #ddd;
        text-align: left;
    }

    th {
        background-color: #f4f4f4;
        color: #333;
    }

    td img {
        width: 50px;
        height: auto;
        border-radius: 5px;
        margin-right: 10px;
        vertical-align: middle;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }


    h2 {
        color: #333;
        font-size: 24px;
        margin-top: 40px;
        font-family: Arial, sans-serif;
    }

</style>