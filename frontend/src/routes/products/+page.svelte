<script type="ts">

    import { onMount } from "svelte";
    import { io } from "$lib/webSocketConnection";
    import { load } from "./+page";
    import { goto } from "$app/navigation";
    import { isUserLoggedIn } from "../../helpers/helpers";
    import Product from "$lib/product.svelte";


    /** @type {import('./$types').PageData} */
    export let data;

    onMount(() => {
        isUserLoggedIn() || goto('/login');
        io.on("ProductCreatedEvent", (event) => {
            load().then((newData) => {
                data = newData;
            })
        })
    })

</script>

<div class="products container">
    <div class="mb-5 d-flex justify-content-center align-items-center">
        <a href="/products/addNewProduct" class="button-81 w-50">
            <span class="icon">+</span> Add New Product
        </a>
    </div>

    <div class="row">
        {#if data.products.length > 0}
            {#each data.products as product}
                <Product product={product} />
            {/each}
        {:else}
            <p class="empty-message">No products available</p>
        {/if}
    </div>
</div>

<style>
    @import './style.css';
</style>
