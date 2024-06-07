<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { interceptedFetch } from '../../../helpers/helpers';
    import type { Product } from "../../../models/products";

    interface Sale {
        id: number;
        date_from: string;
        date_to: string;
        percentage: number;
        isActive: boolean;
        product: Product;
    }


    const activeSales = writable<Sale[]>([]);
    const inactiveSales = writable<Sale[]>([]);


    async function fetchActiveSales() {
        const response = await interceptedFetch('/sale/active', {});
        const data = await response.json();
        activeSales.set(data);
    }

    async function fetchInactiveSales() {
        const response = await interceptedFetch('/sale/inactive', {});
        const data = await response.json();
        inactiveSales.set(data);
    }


    onMount(
        async () => {
            await fetchActiveSales();
            await fetchInactiveSales();
        }
    );
</script>

<style>
    .container {
        margin-top: 50px;
    }

    .bold {
        font-weight: bold;
    }
</style>
<div class="container">
    <h1 class="text-center">Sales</h1>
    <div class="row mt-5 mb-5">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h3 class="text-dark-blue text-center">Active Sales</h3>
                </div>
                <ul class="list-group list-group-flush">
                    {#each $activeSales as sale}
                        <li class="list-group-item">
                            <div>
                                <strong>{sale.product.name}</strong>
                                <span class="text-dark-blue bold"> - {sale.percentage}% off</span>
                            </div>
                            <div>
                                {sale.date_from} - {sale.date_to}
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h3 class="text-dark-blue text-center">Inactive Sales</h3>
                </div>
                <ul class="list-group list-group-flush">
                    {#each $inactiveSales as sale}
                        <li class="list-group-item">
                            <div>
                                <strong>{sale.product.name}</strong>
                                <span class="text-dark-blue bold"> - {sale.percentage}% off</span>
                            </div>
                            <div>
                                {sale.date_from} - {sale.date_to}
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
    <div class="center-kids">
        <a class="btn btn-primary" href="/admin/add-sale">Add a new sale</a>
    </div>
</div>
