<script lang="ts">
  import "../styles/global.css";
  import type {Product} from "../models/products";
  export let product:Product;
</script>

<a href={`/products/${product.id}`} class="phone-card-link">
  <div class="phone-card">
    <img
      src="{product.imageURL}"
      alt="{product.name}"
      class="phone-image"
    />
    <div class="phone-info">
      <h3 class="brand-name">{product.name}</h3>
      <p class="model-name">{product.name}</p>
      <p class="price-before-sale">{product.price}MKD</p>
      <p class="new-price">{product.price}MKD</p>
    </div>
    <div class="phone-actions">
        <a href="/favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>
          </a>
          <a href="/cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
          </a>
    </div>
  </div>
</a>
