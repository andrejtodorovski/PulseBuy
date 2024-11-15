<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import CartRepository from '../../repository/cartRepository';
    import CartItemRepository from '../../repository/cartItemRepository';
    import { type Cart, CreateCartDto } from '../../models/cart';
    import type { CartItem } from '../../models/cart-item';
    import { getUserId, isUserCustomer } from '../../helpers/helpers';
    import { toasts } from "svelte-toasts";
    import { goto } from "$app/navigation";
    import { CreateOrderInfo } from "../../models/cart";

    const cartItems = writable<CartItem[]>([]);
    let cart: Cart | null;
    let total = 0;
    let orderInfo = new CreateOrderInfo();


    async function loadUserCart() {
        const userId = getUserId();
        if (!userId) return;

        const cartResponse = await CartRepository.getCartByUser(userId);
        const userCart = await cartResponse.json();
        cart = userCart;

        const cartItemsResponse = await CartItemRepository.getCartItemsByCartId(userCart.id.toString());
        const items = await cartItemsResponse.json();

        cartItems.set(items);

        total = items.reduce((acc, item) => acc + item.quantity * parseFloat(item.product.price), 0);
    }

    async function removeItemFromCart(itemId: number) {
        try {
            const response = await CartItemRepository.deleteCartItem(itemId.toString());
            if (response.ok) {
                toasts.success('Item removed from cart.');
                await loadUserCart();
            } else {
                const errorMessage = await response.json();
                toasts.error(errorMessage.message);
            }
        } catch (error) {
            toasts.error('Failed to remove item from cart.');
        }
    }

    async function updateQuantity(itemId: number, quantity: number, numberInStock: number) {
        try {
            if (quantity.toString() == '') {
                return;
            }
            if (isNaN(quantity)) {
                toasts.error('Quantity must be a number.');
                return;
            }
            if (quantity < 0 || isNaN(quantity)) {
                toasts.error('Quantity cannot be less than 0.');
                return;
            }
            if (quantity == 0) {
                await removeItemFromCart(itemId);
                return;
            }
            if (quantity > numberInStock) {
                toasts.error('Not enough in stock. Please select a lower quantity');
                return;
            }
            const response = await CartItemRepository.updateCartItem(itemId.toString(), {quantity});
            if (response.ok) {
                toasts.success('Quantity updated successfully.');
                await loadUserCart();
            } else {
                const errorMessage = await response.json();
                toasts.error(errorMessage.message);
            }
        } catch (error) {
            toasts.error('Failed to update quantity.');
        }
    }

    const orderProducts = async () => {
        if (orderInfo.streetAddress == '' || orderInfo.city == '' || orderInfo.postalCode == '' || orderInfo.country == '' || orderInfo.phoneNumber == '') {
            toasts.error('Please fill in all fields.');
            return;
        }
        const currentCart = cart;
        if (!currentCart) {
            toasts.error('No cart available to order.')
            return;
        }

        try {
            const response = await CartRepository.orderCart(currentCart.id.toString(), orderInfo);
            if (response.ok) {
                toasts.success('Order placed successfully!');
                cartItems.set([]);
                cart = null;
            } else {
                const errorMessage = await response.json();
                toasts.error(errorMessage.message);
            }
        } catch (error) {
            toasts.error('Failed to place order.');
        }
        await loadUserCart();
    }


    onMount(async () => {
        if (!isUserCustomer()) {
            await goto("/unauthorized")
        } else {
            await loadUserCart();
        }
    });
</script>

<div class="container">
    {#if $cartItems.length > 0}
        <h2>Your Cart</h2>
        <table>
            <thead>
            <tr>
                <th>Product</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Remove</th>
            </tr>
            </thead>
            <tbody>
            {#each $cartItems as item}
                <tr>
                    <td><img src={item.product.imageURL} alt={item.product.name}> {item.product.name}</td>
                    <td>{item.product.description}</td>
                    <td>
                        <input class="form-control" type="number" min="1" max="{item.product.numberInStock}"
                               value={item.quantity}
                               on:input={(event) => updateQuantity(item.id, event.target.value, item.product.numberInStock)}/>
                    </td>
                    <td>${item.product.price}</td>
                    <td>${(item.quantity * item.product.price)}</td>
                    <td>
                        <span class="cursor-pointer" on:click={() => removeItemFromCart(item.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                 height="16" fill="currentColor"
                                 class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"></path>
                            </svg>
                        </span>
                    </td>
                </tr>
            {/each}
            <tr class="total-row">
                <td colspan="4">Total Price</td>
                <td colspan="2">${total.toFixed(2)}</td>
            </tr>
            </tbody>
        </table>
        <form class="d-flex flex-column align-items-center justify-content-center mt-4">
            <input
                    type="text"
                    placeholder="Enter your address"
                    class="form-control me-2 mb-2 w-50"
                    bind:value={orderInfo.streetAddress}
            />
            <input
                    type="text"
                    placeholder="Enter your city"
                    class="form-control me-2 mb-2 w-50"
                    bind:value={orderInfo.city}
            />
            <input
                    type="text"
                    placeholder="Enter your postal code"
                    class="form-control me-2 mb-2 w-50"
                    bind:value={orderInfo.postalCode}
            />
            <input
                    type="text"
                    placeholder="Enter your country"
                    class="form-control me-2 mb-2 w-50"
                    bind:value={orderInfo.country}
            />
            <input
                    type="tel"
                    placeholder="Enter your phone number"
                    class="form-control me-2 mb-2 w-50"
                    bind:value={orderInfo.phoneNumber}
            />
            <button class="btn btn-primary" on:click={orderProducts}>Order Products</button>
        </form>

    {:else}
        <div class="alert alert-info mt-4" role="alert">
            Your cart is empty.
        </div>
    {/if}
</div>
<style>
    @import './style.css';
</style>