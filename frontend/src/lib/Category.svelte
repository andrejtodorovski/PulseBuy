<script lang="ts">
     import type {Category} from "../models/category";
    export let category : Category;
</script>

<div class="category-card">
    <div class="category-content">
        <h3 class="category-name">{category.name}</h3>
        <p class="category-description">{category.description}</p>
    </div>
</div>

<style>
    .category-card {
        border: 1px solid #ccc;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: box-shadow 0.2s ease;
    }

    .category-card:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .category-content {
        padding: 20px;
    }

    .category-name {
        margin-top: 0;
        margin-bottom: 8px;
        font-size: 24px;
        color: #333;
    }

    .category-description {
        margin: 0;
        font-size: 16px;
        color: #666;
    }
</style>
