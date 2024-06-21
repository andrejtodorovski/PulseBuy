<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { interceptedFetch, isUserAdmin } from "../../../helpers/helpers";
    import type { Product } from "../../../models/products";
    import { goto } from "$app/navigation";

    let products = [] as Product[];
    let showModal = false;
    let selectedProduct: Product | null = null;
    let amount = 0;

    const dispatch = createEventDispatcher();

    function openModal(product: Product) {
        selectedProduct = product;
        amount = 0;
        showModal = true;
    }

    function closeModal() {
        showModal = false;
        selectedProduct = null;
    }

    async function addStock() {
        if (selectedProduct) {
            await interceptedFetch(`/product/${selectedProduct.id}/stock`, {
                method: "PATCH",
                body: JSON.stringify({numberInStock: amount}),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            selectedProduct.numberInStock += amount;
            closeModal();
            await fetchProductsForRestocking()
        }
    }

    async function fetchProductsForRestocking() {
        const response = await interceptedFetch("/product/sorted-for-restocking", {});
        products = await response.json();
    }

    onMount(async () => {
        if (!isUserAdmin()) {
            await goto("/unauthorized")
        } else {
            await fetchProductsForRestocking();
        }
    });
</script>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    table, th, td {
        border: 1px solid black;
    }

    th, td {
        padding: 10px;
        text-align: left;
    }

    .modal {
        display: block;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 500px;
    }
</style>

<div class="container pt-5">
    <h1>Stock Management</h1>
    <table>
        <thead>
        <tr>
            <th>Product Name</th>
            <th>Current Stock</th>
            <th>Add Stock</th>
        </tr>
        </thead>
        <tbody>
        {#each products as product}
            <tr>
                <td>{product.name}</td>
                {#if product.numberInStock === 0}
                    <td class="text-danger bold">{product.numberInStock}</td>
                {:else if (product.numberInStock < 10)}
                    <td class="text-warning bold">{product.numberInStock}</td>
                {:else}
                    <td>{product.numberInStock}</td>
                {/if}
                <td>
                    <button on:click={() => openModal(product)} class="btn btn-primary">Add Stock</button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

{#if showModal}
    <div class="modal">
        <div class="modal-content">
            <h5>Add Stock for {selectedProduct ? selectedProduct.name : ''}</h5>
            <form on:submit|preventDefault={addStock}>
                <label for="amount" class="text-dark-blue">Amount:</label>
                <input class="form-control" type="number" id="amount" name="amount" min="1" bind:value={amount}
                       required>
                <button type="submit" class="btn btn-primary mt-3">Submit</button>
                <button class="btn btn-primary mt-3" on:click={closeModal}>Discard</button>
            </form>
        </div>
    </div>
{/if}
