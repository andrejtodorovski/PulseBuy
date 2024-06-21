<script lang="ts">
    import { interceptedFetch, isUserAdmin } from "../../../helpers/helpers";
    import { toasts } from "svelte-toasts";
    import { derived, writable } from "svelte/store";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    interface CreateSaleDto {
        date_from: string;
        date_to: string;
        percentage: number;
        productId: number;
    }

    interface Product {
        id: number;
        name: string;
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

    const isFormValid = derived(newSale, $newSale => {
        return (
            $newSale.date_from.trim() !== '' &&
            $newSale.date_to.trim() !== '' &&
            $newSale.percentage > 0 &&
            $newSale.productId > 0
        );
    });

    async function createSale() {
        const sale = $newSale;
        const result = await interceptedFetch('/sale', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sale),
        });
        if (result.ok) {
            toasts.success('Sale created successfully');
            window.location.href = '/admin/sales';
        } else {
            const errorMessage = await result.json();
            toasts.error(errorMessage.message);
        }
    }

    onMount(async () => {
        if (!isUserAdmin()) {
            await goto("/unauthorized")
        } else {
            await fetchProducts();
        }
    });
</script>

<div class="container center-kids">
    <div class="custom-card w-50 padding-form">
        <div class="card-header border-0">
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
                <div class="center-kids">
                    <button type="submit" class="btn btn-primary form-submit" disabled={!$isFormValid}>Add Sale</button>
                </div>
            </form>
        </div>
    </div>
</div>


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

    .form-submit:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .border-0 {
        border: 0;
    }
</style>