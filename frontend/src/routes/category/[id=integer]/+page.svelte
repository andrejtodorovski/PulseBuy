<script lang="ts">
    import { onMount } from 'svelte';
    import type { Category } from "../../../models/category";
    import { page } from "$app/stores";
    import CategoriesRepository from "../../../repository/categoriesRepository";

    let category: Category | undefined;

    onMount(async () => {
        const categoryId = $page.params.id;

        CategoriesRepository.fetchCategorytById(categoryId).then((data) => {
            data.json().then((categoryData) => {
                category = categoryData;
            });
        });
    });
</script>

<div class="category-details">
    <div class="category-info">
        <h1>{category?.name}</h1>
        <p class="description">{category?.description}</p>
    </div>
</div>

<style>
    @import "./style.css";
</style>
