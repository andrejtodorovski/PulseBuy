<script lang="ts">
    import { CreateCategorytDto } from "../../../models/category";
    import CategoriesRepository from "../../../repository/categoriesRepository";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { isUserAdmin } from "../../../helpers/helpers";

    let createCategoryDto = new CreateCategorytDto();

  let message: string | undefined;
  onMount(async () => {
    if (!isUserAdmin()) {
      await goto("/unauthorized");
    }
  });
  const addCategory = async () => {
    try {
      const res = await CategoriesRepository.addNewCategory(createCategoryDto);

      if (res.ok) {
        message = "Category was added successfully!";
        await goto("/products/category");
      } else {
        message = "Failed to add category.";
      }
    } catch (err) {
      console.log(err);
    }
  };
</script>

<svelte:head>
  <title>Add Category</title>
</svelte:head>

<div class="container mt-4 center-kids">
  <div class="custom-card rounded-lg border border-gray-200 shadow-md w-50 padding-form">
    <form on:submit|preventDefault={addCategory}>
      <div class="d-flex align-items-center mb-3">
        <h3 class="text-xl font-medium">Add New Category</h3>
      </div>
      <div class="form-group">
        <label for="categoryName">Category Name:</label>
        <input type="text" class="form-control" id="categoryName" bind:value={createCategoryDto.name} />
      </div>

      <div class="form-group">
        <label for="categoryDescription">Category Description:</label>
        <textarea class="form-control" id="categoryDescription" rows="10"
                  bind:value={createCategoryDto.description}></textarea>
      </div>

      <button type="submit" class="btn btn-primary mt-2">Add Category</button>
    </form>
    {#if message}
      <p>{message}</p>
    {/if}
  </div>
</div>
