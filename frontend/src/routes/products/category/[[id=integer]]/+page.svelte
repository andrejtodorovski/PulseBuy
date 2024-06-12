<script type="ts">
    import { onDestroy, onMount } from "svelte";
    import { io } from "$lib/webSocketConnection";
    import { goto } from "$app/navigation";
    import { isUserAdmin, isUserLoggedIn } from "../../../../helpers/helpers";
    import Product from "$lib/product.svelte";
    import { toasts } from "svelte-toasts";
    import { page } from "$app/stores";
    import ProductsRepository from "../../../../repository/productsRepository";

    export let data;
    let pageNumber = 1;
    let pageSize = 8;
    let products = [];
    let filter = "";
    let sort = "najnovo"; // default
    let productsLength = products.length;
    let numberOfPages = Math.ceil(productsLength / pageSize);
    let productsToShow = products.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    let loggedInAndAdmin = isUserLoggedIn() && isUserAdmin();
    const categoryId = $page.params.id;
    loadProducts().then(() => {
        applyFiltersAndSorting();
    });

    async function loadProducts() {
        const res = await ProductsRepository.fetchProducts(categoryId)
        const fetchedProducts = await res.json()

        if (res.ok) {
            products = fetchedProducts
        } else {
            products = []
        }
    }

    async function applyFiltersAndSorting() {
        let filteredProducts = products;
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
        productsToShow = filteredProducts.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    }

    function handlePagination(selectedPage) {
        pageNumber = selectedPage;
        applyFiltersAndSorting();
    }

    function handleFilterChange(event) {
        filter = event.target.value;
        pageNumber = 1;
        applyFiltersAndSorting();
    }

    function handleSortChange(event) {
        sort = event.target.value;
        pageNumber = 1;
        applyFiltersAndSorting();
    }

    onMount(() => {
        const roomId = "Product";

        io.emit("joinRoom", roomId);

        io.on("Product.ProductCreatedEvent", () => {
            loadProducts().then(() => {
                applyFiltersAndSorting();
            });
        });

        io.on("Product.ProductUpdatedEvent", () => {
            loadProducts().then(() => {
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
    {#if loggedInAndAdmin}
        <div class="mb-5 d-flex justify-content-center align-items-center">
            <a href="/products/add-product" class="button-81 w-50">
                <span class="icon">+</span> Add New Product
            </a>
        </div>
    {/if}

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
            {#each productsToShow as product}
                <Product product={product}/>
            {/each}
        {:else}
            <p class="empty-message">No products available</p>
        {/if}
    </div>

    <div class="pagination d-flex justify-content-center align-items-center">
        {#if numberOfPages > 1}
            <button type="button" class="page-link {pageNumber === 1 ? 'disable' : ''}"
                    on:click={() => handlePagination(pageNumber - 1)} disabled={pageNumber === 1}>Previous
            </button>
            {#each Array(numberOfPages) as _, i}
                <li class="page-item {pageNumber === (i + 1) ? 'active' : ''}">
                    <button type="button" class="page-link" on:click={() => handlePagination(i + 1)}>{i + 1}</button>
                </li>
            {/each}
            <button type="button" class="page-link {pageNumber === numberOfPages ? 'disable' : ''}"
                    on:click={() => handlePagination(pageNumber + 1)} disabled={pageNumber === numberOfPages}>Next
            </button>
        {/if}
    </div>
</div>

<style>
    @import 'style.css';
</style>
