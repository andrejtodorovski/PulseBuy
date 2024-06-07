<script lang="ts">

    import { isUserAdmin } from "../../helpers/helpers";
</script>
<div class="container mt-5">
    {#if isUserAdmin()}
        <h1 class="text-center mb-5">Admin pages</h1>
        <div class="admin-page-grid">
            <a href="/admin/analytics">
                <div class="card text-center p-4 flex-fill mx-2">
                    <div class="card-body">
                        <div class="card-icon text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor"
                                 class="bi bi-bar-chart-line" viewBox="0 0 16 16">
                                <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z"/>
                            </svg>
                        </div>
                        <h5 class="text-dark-blue">View detailed analytics</h5>
                    </div>
                </div>
            </a>
            <a href="/admin/users">
                <div class="card text-center p-4 flex-fill mx-2">
                    <div class="card-body">
                        <div class="card-icon text-success">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor"
                                 class="bi bi-person-fill-gear" viewBox="0 0 16 16">
                                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                            </svg>
                        </div>
                        <h5 class="text-dark-blue">Manage user permissions</h5>
                    </div>
                </div>
            </a>
            <a href="/admin/sales">
                <div class="card text-center p-4 flex-fill mx-2">
                    <div class="card-body">
                        <div class="card-icon text-danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor"
                                 class="bi bi-cash-coin" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
                                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
                                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
                                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
                            </svg>
                        </div>
                        <h5 class="text-dark-blue">Manage sales</h5>
                    </div>
                </div>
            </a>
            <a href="/admin/add-product">
                <div class="card text-center p-4 flex-fill mx-2">
                    <div class="card-body">
                        <div class="card-icon text-warning"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                        </div>
                        <h5 class="text-dark-blue">Add a new product</h5>
                    </div>
                </div>
            </a>
            <a href="/admin/add-category">
                <div class="card text-center p-4 flex-fill mx-2">
                    <div class="card-body">
                        <div class="card-icon text-warning"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                        </div>
                        <h5 class="text-dark-blue">Add a new category</h5>
                    </div>
                </div>
            </a>
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
        grid-template-columns: 50% 50%;
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
