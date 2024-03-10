<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<div class="products">
    <a href="/products/addNewProduct" class="btn btn-primary mb-5">Add new product</a>
    <ul>
        {#each data.products as product}
            <div>
                <!-- check <a sveltekit:prefetch href -->
                <img src={product.imageURL} alt={product.name}/>
                <a href={`/products/${product.id}`}>{product.name}</a>
            </div>
        {/each}
    </ul>
</div>

<style>
    .products {
        margin-top: 20px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    a {
        display: inline-block;
        margin-top: 10px;
        padding: 10px;
        border: 1px dotted rgba(255, 255, 255, 0.2);
    }

    img {
        width: 100px;
        height: 100px;
    }
</style>
