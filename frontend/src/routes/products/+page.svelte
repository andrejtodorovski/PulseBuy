<script type="ts">
    import { onDestroy, onMount } from "svelte";
    import { io } from "$lib/webSocketConnection";
    import { load } from "./+page";
    import { goto } from "$app/navigation";
    import { isUserLoggedIn } from "../../helpers/helpers";
    import Product from "$lib/product.svelte";
    import { toasts } from "svelte-toasts";

    /** @type {import('./$types').PageData} */
    export let data;
    let page = 1;
    let pageSize = 8;
    let filter = "";
    let sort = "najnovo"; // default
    let productsLength = data.products.length;
    let numberOfPages = Math.ceil(productsLength / pageSize);
    let products = data.products.slice((page - 1) * pageSize, page * pageSize);
    applyFiltersAndSorting();

    function applyFiltersAndSorting() {
        let filteredProducts = data.products;

        if (filter) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(filter.toLowerCase())
            );
        }

        if (sort) {
            filteredProducts.sort((a, b) => {
                if (sort === "priceasc") {
                    return a['price'] - b['price'];
                } else if (sort === "pricedesc") {
                    return b['price'] - a['price'];
                } else if (sort === "nameasc") {
                    return a['name'].localeCompare(b['name']);
                } else if (sort === "namedesc") {
                    return b['name'].localeCompare(a['name']);
                } else if (sort === "najnovo") {
                    return new Date(a['createdAt']) > new Date(b['createdAt']) ? -1 : 1;
                } else {
                    toasts.error("Invalid sort option!");
                }
            });
        }

        productsLength = filteredProducts.length;
        numberOfPages = Math.ceil(productsLength / pageSize);
        products = filteredProducts.slice((page - 1) * pageSize, page * pageSize);
    }

    function handlePagination(selectedPage) {
        page = selectedPage;
        applyFiltersAndSorting();
    }

    function handleFilterChange(event) {
        filter = event.target.value;
        page = 1;
        applyFiltersAndSorting();
    }

    function handleSortChange(event) {
        sort = event.target.value;
        page = 1;
        applyFiltersAndSorting();
    }

    onMount(() => {
        isUserLoggedIn() || goto('/login');

        const roomId = "Product";

        io.emit("joinRoom", roomId);

        io.on("Product.ProductCreatedEvent", (event) => {
            load().then((newData) => {
                data = newData;
                applyFiltersAndSorting();
            });
        });

        io.on("Product.ProductUpdatedEvent", (event) => {
            load().then((newData) => {
                data = newData;
                applyFiltersAndSorting();
            });
        });
    });

    onDestroy(() => {
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

    <div class="filters d-flex justify-content-center align-items-center mb-3">
        <input type="text" placeholder="Пребарувај по име.." on:input={handleFilterChange}/>
        <select on:change={handleSortChange}>
            <option value="najnovo">Најновото прво</option>
            <option value="nameasc">По име(А-Ш)</option>
            <option value="namedesc">По име(Ш-А)</option>
            <option value="priceasc">По цена(ниска-висока)</option>
            <option value="pricedesc">По цена(висока-ниска)</option>
        </select>
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
