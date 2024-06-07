<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { interceptedFetch } from '../../../helpers/helpers';

    interface Product {
        id: number;
        name: string;
    }

    interface CreateSaleDto {
        date_from: string;
        date_to: string;
        percentage: number;
        productId: number;
    }

    const products = writable<Product[]>([]);
    const newSale = writable<CreateSaleDto>({
        date_from: '',
        date_to: '',
        percentage: 0,
        productId: 0,
    });

    async function fetchProducts() {
        const response = await interceptedFetch('/product', {});
        const data = await response.json();
        products.set(data);
    }

    async function createSale() {
        const sale = $newSale;
        await fetch('/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sale),
        });
        // Optionally reset form or handle success
    }

    onMount(fetchProducts);
</script>

<style>
    .container {
        margin-top: 50px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-control {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }

    .form-submit {
        margin-top: 20px;
    }
</style>

<div class="container">
    <div class="custom-card">
        <div class="card-header">
            <h3>Add New Sale</h3>
        </div>
        <div class="card-body">
            <form on:submit|preventDefault={createSale}>
                <div class="form-group">
                    <label for="product">Product</label>
                    <select id="product" bind:value={$newSale.productId} class="form-control">
                        <option value="" disabled selected>Select a product</option>
                        {#each $products as product}
                            <option value={product.id}>{product.name}</option>
                        {/each}
                    </select>
                </div>
                <div class="form-group">
                    <label for="percentage">Sale Percentage</label>
                    <input type="number" id="percentage" bind:value={$newSale.percentage} class="form-control" min="0"
                           max="100"/>
                </div>
                <div class="form-group">
                    <label for="date_from">Date From</label>
                    <input type="date" id="date_from" bind:value={$newSale.date_from} class="form-control"/>
                </div>
                <div class="form-group">
                    <label for="date_to">Date To</label>
                    <input type="date" id="date_to" bind:value={$newSale.date_to} class="form-control"/>
                </div>
                <button type="submit" class="btn btn-primary form-submit">Add Sale</button>
            </form>
        </div>
    </div>
</div>
