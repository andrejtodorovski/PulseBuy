<script lang="ts">
    import { isUserAdmin } from "../../../helpers/helpers";
</script>
<div class="container mt-5">
    {#if isUserAdmin()}
        <h1 class="text-center mb-5">System analytics</h1>
        <div class="admin-page-grid">
            <div class="card text-center p-4 flex-fill mx-2">
                <div class="card-body">
                    <div class="card-icon text-primary">
                        15
                    </div>
                    <h5 class="text-dark-blue">New products in the last month</h5>
                </div>
            </div>
            <div class="card text-center p-4 flex-fill mx-2">
                <div class="card-body">
                    <div class="card-icon text-success">
                        200
                    </div>
                    <h5 class="text-dark-blue">Successful orders in the last month</h5>
                </div>
            </div>
            <div class="card text-center p-4 flex-fill mx-2">
                <div class="card-body">
                    <div class="card-icon text-danger">
                        10
                    </div>
                    <h5 class="text-dark-blue">Products that need restocking</h5>
                </div>
            </div>
            <div class="card text-center p-4 flex-fill mx-2">
                <div class="card-body">
                    <div class="card-icon text-warning">
                        450
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
