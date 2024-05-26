<script type="ts">

    import { onDestroy, onMount } from "svelte";
    import { io } from "$lib/webSocketConnection";
    import { load } from "./+page";
    import { goto } from "$app/navigation";
    import { isUserLoggedIn } from "../../helpers/helpers";
    import Product from "$lib/product.svelte";


    /** @type {import('./$types').PageData} */
    export let data;
    let page = 1;
    let pageSize = 8;
    let productsLength = data.products.length;
    let numberOfPages = Math.ceil(productsLength / pageSize);
    let products = data.products.slice((page - 1) * pageSize, page * pageSize);

    function handlePagination(selectedPage) {
        page = selectedPage;
        products = data.products.slice((page - 1) * pageSize, page * pageSize);
    }

    onMount(() => {
        isUserLoggedIn() || goto('/login');

        const roomId = "Product"

        io.emit("joinRoom", roomId);

        io.on("Product.ProductCreatedEvent", (event) => {
            load().then((newData) => {
                data = newData;
                productsLength = data.products.length;
            })
        })

        io.on("Product.ProductUpdatedEvent", (event) => {
            load().then((newData) => {
                data = newData;
                productsLength = data.products.length;
            })
        })
    })

    onDestroy(() => {
        // Leave the room when the component is unmounted
        const roomId = 'Product';

        io.emit('leaveRoom', roomId);
    });

</script>

<div class="products container">
    <div class="mb-5 d-flex justify-content-center align-items-center">
        <a href="/products/addNewProduct" class="button-81 w-50">
            <span class="icon">+</span> Add New Product
        </a>
    </div>

    <div class="row">
        {#if productsLength > 0}
            {#each products as product}
                <Product product={product}/>
            {/each}
        {:else}
            <p class="empty-message">No products available</p>
        {/if}
    </div>

    <div class="pagination d-flex justify-content-center align-items-center">
        {#if numberOfPages > 1}
            <button type="button" class="page-link {page === 1 ? 'disable' : ''}"
                    on:click={() => handlePagination(page - 1)} disabled={page === 1}>Previous
            </button>
            {#each Array(numberOfPages) as _, i}
                <li class="page-item {page === (i + 1) ? 'active' : ''}">
                    <button type="button" class="page-link" on:click={() => handlePagination(i + 1)}>{i + 1}</button>
                </li>
            {/each}
            <button type="button" class="page-link {page === numberOfPages ? 'disable' : ''}"
                    on:click={() => handlePagination(page + 1)} disabled={page === numberOfPages}>Next
            </button>
        {/if}
    </div>
</div>

<style>
    @import './style.css';
</style>
