<script lang="ts">
    import {onDestroy, onMount} from 'svelte';
    import type {Product} from "../../../models/products";
    import {page} from "$app/stores";
    import ProductsRepository from "../../../repository/productsRepository";
    import {io} from "$lib/webSocketConnection";
    import {load} from "../+page";

    let product: Product | undefined;

    const fetchProduct = () => {
        const productId = $page.params.id;

        ProductsRepository.fetchProductById(productId).then((data) => {
            data.json().then((productData) => {
                product = productData;
            });
        });
    }

    onMount(async () => {
        const roomId = `Product/${$page.params.id}`

        io.emit("joinRoom", roomId);

        fetchProduct()

        io.on("Product.ProductUpdatedEvent", (event) => {
            console.log("ProductUpdatedEvent", event)
            load().then((newData) => {
                fetchProduct()
            })
        })
    });

    onDestroy(async () => {
        const roomId = `Product/${$page.params.id}`
        io.emit("leaveRoom", roomId);
    });
</script>

<div class="product-details">
    <div class="product-image">
        <img src={product?.imageURL} alt={product?.name}/>
    </div>
    <div class="product-info">
        <h1>{product?.name}</h1>
        <p class="category">Category: {product?.category.name}</p>
        <p class="description">{product?.description}</p>
        <p class="price">Price: ${product?.price}</p>
    </div>
    <a href={`/products/${product?.id}/edit`} class="phone-card-link col-md-3">
        Edit
    </a>
</div>

<style>
    @import "./style.css";
</style>