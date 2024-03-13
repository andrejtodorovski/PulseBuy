<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import ProductsRepository from '../../../repository/productsRepository';
        import type { Product } from '../../../models/products';
    import { CreateCartItemDto } from '../../../models/cart-item';
    import CartRepository from '../../../repository/cartRepository';
    import CartItemRepository from '../../../repository/cartItemRepository';
    import type {Cart} from '../../../models/cart';  
        import type { PageData } from '../$types';
    export let data: PageData;
  
    let product : Product;
    let message: string | undefined;
    let cart : Cart;
  
    const productId = $page.params.id;
   let  createCartItemDto = new CreateCartItemDto();
  
   onMount(async () => {
    try {
      const productResponse = await ProductsRepository.fetchProductById(productId);
      if (productResponse.ok) {
        product = await productResponse.json();
      } else {
        message = "Failed to load product details.";
      }
      
      let userId : string =  localStorage.getItem('userId') ?? '';
      const cartResponse = await CartRepository.getCartByUser(userId);
      if (cartResponse.ok) {
        cart = await cartResponse.json();

      } else {
        message = "Failed to load user cart.";
        
      }
    } catch (err) {
      message = "An error occurred while fetching details.";
    }
  });
    const addToCart = async () => {
      createCartItemDto.productId = Number(productId);
createCartItemDto.cartId = cart.id;


        try {

          const res = await CartItemRepository.createCartItem(createCartItemDto);
          if (res.ok) {
            message = "Product was added to cart successfully!";
            goto('/products');
          } else {
            message = "Failed to add product to cart.";
          }
        } catch (err) {
          message = "An error occurred while adding product to cart.";
        }
    };
  
    const goBack = () => {
      goto('/products');
    };
  </script>
  
  <svelte:head>
    <title>Add to Cart</title>
  </svelte:head>
  
  <div class="container mt-4 w-80">
    <div class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md w-full">
      {#if product}
        <h2 class="text-xl font-medium">{product.name}</h2>
        <p>Price: ${product.price}</p>
        <label for="quantity">Quantity:</label>
        <input type="number" min="1" class="form-control" id="quantity" bind:value={createCartItemDto.quantity} />
  
        <button class="btn btn-primary mt-2" on:click|preventDefault={addToCart}>Add to Cart</button>
        <button class="btn btn-secondary mt-2" on:click|preventDefault={goBack}>Back</button>
      {:else}
        <p class="alert alert-danger">{message}</p>
      {/if}
    </div>
  </div>
  <style>
    @import '../style.css'
  </style>