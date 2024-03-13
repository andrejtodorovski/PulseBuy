<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<div class="categories">
    <div class="mb-5 d-flex justify-content-center align-items-center">
        <a href="/category/addNewCategory" class="button-81 w-50">
            <span class="icon">+</span> Add New Category
        </a>
    </div>

    <div class="category-list">
        {#if data.categories.length > 0}
            {#each data.categories as category}
                <a href={`/category/${category.id}`} class="category-card-link">
                    <div class="category-card">
                        <div class="category-info">
                            <h3 class="category-name">{category.name}</h3>
                            <p class="category-description">
                                {category.description.length > 40 ? `${category.description.substring(0, 50)}...` : category.description}
                            </p>                        
                        </div>
                        <div class="category-actions">
                        
                        </div>
                    </div>
                </a>
            {/each}
        {:else}
            <p class="empty-message">No categories available</p>
        {/if}
    </div>
</div>

<style>
        @import './style.css';
</style>