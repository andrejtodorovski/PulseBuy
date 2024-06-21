<script lang="ts">
  import type { PageData } from "./$types"
  import Product from "$lib/product.svelte";

  export let data: PageData

    const images = [
        {id: 1, src: "/img/iphone15pro.jpg", alt: "Iphone 15 Pro"},
        {id: 2, src: "/img/galaxys24ultra.jpg", alt: "Samsung Galaxy S24 Ultra"},
        {
            id: 3,
            src: "/img/pixelphonebudswatch.jpg",
            alt: "Google Pixel Phone, Buds and Watch",
        },
    ];
</script>

<div class="index">
    <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-bs-ride="carousel"
    >
        <div class="carousel-indicators">
            {#each images as image, index (image.id)}
                <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        class={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                ></button>
            {/each}
        </div>
        <div class="carousel-inner">
            {#each images as image, index (image.id)}
                <div class={`carousel-item ${index === 0 ? "active" : ""}`}>
                    <img
                            src={image.src}
                            class="d-block w-100 carousel-img"
                            alt={image.alt}
                    />
                </div>
            {/each}
        </div>
        <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
        >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
        >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    <div class="container">
        <h1 class="p-3">Featured products</h1>

        <div class="d-flex">
            {#each data.products as product}
                <Product product={product}/>
            {/each}
        </div>
    </div>
</div>

<style>
    .index {
        text-align: center;
        display: block;
        margin: 0 auto;
    }

    .carousel-img {
        width: 100%;
        height: 38rem;
        object-fit: cover;
    }

    .container {
        background-color: var(--gray);
        padding: 2rem;
    }

    h1 {
        color: var(--darkest-blue);
    }
</style>
