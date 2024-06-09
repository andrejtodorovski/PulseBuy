<script lang="ts">
    import { interceptedFetch, isUserAdmin } from "../../../helpers/helpers";
    import { onMount } from "svelte";

    interface Analytics {
        products_added_in_the_last_month: number;
        orders_in_the_last_month: number;
        products_that_need_restocking: number;
        products_in_users_wishlists: number;
    }

    let analytics = {} as Analytics;
    async function fetchSystemAnalytics() {
        const response = await interceptedFetch('/system-analytics', {});
        analytics = await response.json();
    }

    onMount(fetchSystemAnalytics)
</script>
<div class="container mt-5">
    {#if isUserAdmin()}
        <h1 class="text-center mb-5">System analytics</h1>
        <div class="admin-page-grid">
            <div class="card text-center p-4 flex-fill mx-2">
                <div class="card-body">
                    <div class="card-icon text-primary">
                        {analytics.products_added_in_the_last_month}
                    </div>
                    <h5 class="text-dark-blue">New products in the last month</h5>
                </div>
            </div>
            <div class="card text-center p-4 flex-fill mx-2">
                <div class="card-body">
                    <div class="card-icon text-success">
                        {analytics.orders_in_the_last_month}
                    </div>
                    <h5 class="text-dark-blue">Successful orders in the last month</h5>
                </div>
            </div>
            <div class="card text-center p-4 flex-fill mx-2">
                <div class="card-body">
                    <div class="card-icon text-danger">
                        {analytics.products_that_need_restocking}
                    </div>
                    <h5 class="text-dark-blue">Products that need restocking</h5>
                </div>
            </div>
            <div class="card text-center p-4 flex-fill mx-2">
                <div class="card-body">
                    <div class="card-icon text-warning">
                        {analytics.products_in_users_wishlists}
                    </div>
                    <h5 class="text-dark-blue">Items in user's wishlist</h5>
                </div>
            </div>
        </div>
    {:else}
        <h1>No permission to view this page</h1>
    {/if}
</div>
<style>
    .card {
        transition: transform 0.3s, box-shadow 0.3s;
        overflow: hidden;
    }

    .admin-page-grid {
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        grid-row: auto;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
    }

    .card:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    .card-icon {
        font-size: 3rem;
        margin-bottom: 15px;
        transition: transform 0.3s;
    }

    .card:hover .card-icon {
        transform: translateY(-10px);
    }

</style>
