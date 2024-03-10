<!-- src/routes/products/productDetails/[id].svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import type {Product} from "../../../models/products";
    import {page} from "$app/stores";
    import ProductsRepository from "../../../repository/productsRepository";

    let product: Product | undefined;

    onMount(async () => {
        // Fetch product details based on the route parameter (id)
        const productId = $page.params.id;

        ProductsRepository.fetchProductById(productId).then((data) => {
            data.json().then((productData) => {
                product = productData;
            });
        });
    });
</script>

<h1>{product?.name}</h1>
<p>Price: ${product?.price}</p>
<p>Quantity: {product?.quantity}</p>
<!-- Add other product details as needed -->
