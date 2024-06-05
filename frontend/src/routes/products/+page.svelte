<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { isUserLoggedIn } from "../../helpers/helpers";

    /** @type {import('../../../../.svelte-kit/types/src/routes').PageData} */
    export let data;
    
    onMount(async () => {
        isUserLoggedIn() || goto('/login');

    });
</script>

<div class="categories container">
    <div class="category-list mt-5">
        {#if data.categories.length > 0}
            {#each data.categories as category}
                <a href={`/products/category/${category.id}`} class="category-card-link">
                    <div class="category-card text-center p-4 flex-fill mx-2">
                        <div class="category-info card-body">
                            <div class="card-icon text-warning">
                                <img class="category-image" alt="" src="{category.imageUrl}">
                            </div>
                            <h5 class="text-dark-blue category-name">{category.name}</h5>
                            <p class="category-description">
                                {category.description.length > 40 ? `${category.description.substring(0, 50)}...` : category.description}
                            </p>
                            <div class="category-actions">

                            </div>
                        </div>
                    </div>
                </a>
            {/each}
            <a href={`/products/category/9999`} class="category-card-link">
                <div class="category-card text-center p-4 flex-fill mx-2">
                    <div class="category-info card-body">
                        <div class="card-icon text-warning">
                            <img class="category-image" alt="" src="https://community.connection.com/wp-content/uploads/2023/10/2350054-Oct-Top-Products-BLOG.jpg">
                        </div>
                        <h5 class="text-dark-blue category-name">Сите производи</h5>
                        <p class="category-description">
                            Сите производи
                        </p>
                        <div class="category-actions">

                        </div>
                    </div>
                </div>
            </a>
        {:else}
            <p class="empty-message">No categories available</p>
        {/if}
    </div>
</div>

<style>
        @import 'style.css';
        h3 {
            color: var(--darkest-blue);
        }
</style>