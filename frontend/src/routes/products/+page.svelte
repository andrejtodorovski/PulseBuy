<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<div class="products">
    <div class="mb-5 d-flex justify-content-center align-items-center">
        <a href="/products/addNewProduct" class="button-81 w-50">
            <span class="icon">+</span> Add New Product
        </a>
    </div>

    <div class="product-list">
        {#if data.products.length > 0}
            {#each data.products as product}
                <div class="product-card">
                    <img src={product.imageURL} alt={product.name}/>
                    <div class="product-details">
                        <h3>{product.name}</h3>
                        <p class="price">${product.price}</p>
                        <a href={`/products/${product.id}`} class="button-81">View Details</a>
                    </div>
                </div>
            {/each}
        {:else}
            <p class="empty-message">No products available</p>
        {/if}
    </div>
</div>

<style>
    @import './style.css';
</style>
