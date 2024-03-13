<script lang="ts">
    import {CreateCategorytDto} from "../../../models/category";
    import type {PageData} from "./$types";
    import CategoriesRepository from "../../../repository/categoriesRepository";
    import { goto } from "$app/navigation";

    export let data: PageData;

    let error : any;
    let createCategoryDto = new CreateCategorytDto();

    let message: string | undefined;

    const addCategory = async () => {
        try {
            const res = await CategoriesRepository.addNewCategory(createCategoryDto);

            if (res.ok) {
                message = "Category was added successfully!";
                goto('/category');
            } else {
                message = "Failed to add category.";
            }
        } catch (err) {
            error = "RES001: An error occurred.";
            console.log(err);
        }
    };
</script>

<svelte:head>
    <title>Add Category</title>
</svelte:head>

<div class="container mt-4 w-80">
    <div class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md w-full">
        <form on:submit|preventDefault={addCategory}>
            <div class="d-flex align-items-center mb-3">
                <h2 class="text-xl font-medium">Add New Category</h2>
            </div>
            <div class="form-group">
                <label for="categoryName">Category Name:</label>
                <input type="text" class="form-control" id="categoryName" bind:value={createCategoryDto.name}/>
            </div>

            <div class="form-group">
                <label for="categoryDescription">Category Description:</label>
                <textarea class="form-control" id="categoryDescription" rows="10" bind:value={createCategoryDto.description}></textarea>
            </div>

            <button type="submit" class="btn btn-primary mt-2">Add Category</button>
        </form>
        {#if message}
            <p>{message}</p>
        {/if}
        {#if error}
            <p class="text-danger">{error}</p>
        {/if}
    </div>
</div>
