<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import CartRepository from '../../repository/cartRepository';
  import CartItemRepository from '../../repository/cartItemRepository';
  import ProductsRepository from '../../repository/productsRepository';
  import { CreateCartDto, type Cart } from '../../models/cart';
  import type { CartItem } from '../../models/cart-item';

  const cartItems = writable<CartItem[]>([]);
  let cart : Cart;
  let total = 0;

  async function loadUserCart() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const cartResponse = await CartRepository.getCartByUser(userId);
    const userCart = await cartResponse.json();
    cart = userCart;

    const cartItemsResponse = await CartItemRepository.getCartItemsByCartId(userCart.id.toString());
    const items = await cartItemsResponse.json();

    cartItems.set(items);

    total = items.reduce((acc, item) => acc + item.quantity * parseFloat(item.product.price), 0);
  }
  async function orderProducts() {
    const currentCart = cart;
    let createCartDto : CreateCartDto = new CreateCartDto();
    createCartDto.userId = Number(localStorage.getItem('userId')) ?? '';
    if (!currentCart) {
      console.error('No cart available to order.');
      return;
    }

    try {
      const response = await CartRepository.orderCart(currentCart.id.toString());
      if (response.ok) {
        console.log('Order placed successfully.');
        cartItems.set([]);
        cart.set(null);
      } else {
        console.error('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
        const res = await CartRepository.createCart(createCartDto);
        if (res.ok) {
            console.log("New cart added successfully!");
        } else {
          console.log('Failed to add cart.');
        }
    }

    
  onMount(() => {
    loadUserCart();
  });
</script>



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
    </tr>
  </thead>
  <tbody>
    {#each $cartItems as item}
    <tr>
      <td><img src={item.product.imageURL} alt={item.product.name}> {item.product.name}</td>
      <td>{item.product.description}</td>
      <td>{item.quantity}</td>
      <td>${item.product.price}</td>
      <td>${(item.quantity * parseFloat(item.product.price)).toFixed(2)}</td>
    </tr>
    {/each}
    <tr class="total-row">
      <td colspan="4">Total Price</td>
      <td>${total.toFixed(2)}</td>
    </tr>
  </tbody>
</table>
<button class="btn btn-primary" on:click={orderProducts}>Order Products</button>

{:else}
<p>Your cart is empty.</p>
{/if}
<style>
  @import './style.css';
</style>