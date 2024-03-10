<script lang="ts">
  import { isUserLoggedIn, removeAuthToken } from "../helpers/helpers";
  import "../styles/global.css";
  export let product:any;
</script>

<a href="/path-to-details-page" class="phone-card-link">
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

<style>
  .phone-card-link {
    text-decoration: none;
    color: inherit; 
  }

  .phone-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    width: 300px;
    margin: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: block;
    color: #333;
    background-color: #fff;
    transition:
      transform 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
  }

  .phone-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .phone-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
    object-fit: cover;
  }

  .brand-name {
    font-weight: bold;
    margin-top: 12px;
  }

  .model-name {
    margin: 5px 0;
  }

  .price-before-sale {
    color: #999;
    text-decoration: line-through;
    margin: 0;
  }

  .new-price {
    color: #e53935;
    font-size: 18px;
    margin: 5px 0 20px;
  }

  .phone-actions {
    display: flex;
    justify-content: space-around;
  }

    .phone-actions a {
        color: #333;
        text-decoration: none;
    }
</style>
