<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import type { Product } from "../../../models/products";
    import { page } from "$app/stores";
    import ProductsRepository from "../../../repository/productsRepository";
    import { goto } from '$app/navigation';
    import { getUserId, isUserAdmin, isUserCustomer, isUserLoggedIn } from '../../../helpers/helpers';
    import { CreateCartItemDto } from "../../../models/cart-item";
    import CartItemRepository from "../../../repository/cartItemRepository";
    import CartRepository from "../../../repository/cartRepository";
    import type { Cart } from "../../../models/cart";
    import { toasts } from "svelte-toasts";
    import { io } from "$lib/webSocketConnection";
    import ReviewRepository from "../../../repository/reviewRepository";
    import { CreateReviewDto, type Review } from "../../../models/review";

    let cart: Cart;
    let average: number;
    let product: Product | undefined;
    let reviews: Review[];
    let createCartItemDto = new CreateCartItemDto();
    let createReviewDto = new CreateReviewDto();
    const productId = $page.params.id;
    let loggedInAndAdmin = isUserLoggedIn() && isUserAdmin();
    let loggedInAndCustomer = isUserLoggedIn() && isUserCustomer();

    const fetchProduct = async () => {
        const productId = $page.params.id;

        ProductsRepository.fetchProductById(productId).then((data) => {
            data.json().then((productData) => {
                product = productData;
            });
        });
    }

    onMount(async () => {

        const roomId = `Product/${$page.params.id}`

        io.emit("joinRoom", roomId);

        await fetchProduct()

        await fetchReviews();

        await getAverage();


        io.on("Product.ProductUpdatedEvent", () => {
            fetchProduct()
        })

        let userId: string = getUserId() || '';
        const cartResponse = await CartRepository.getCartByUser(userId);
        cart = await cartResponse.json();
    });

    const fetchReviews = async () => {
        ReviewRepository.fetchReviewsForProduct(productId).then((data) => {
            data.json().then((reviewsData) => {
                reviews = reviewsData;
            });
        });
    }
    const getAverage = async () => {
        ReviewRepository.getAverageRating(productId).then((data) => {
            data.json().then((averageData) => {
                average = averageData;
            });
        });
    }

    const addReview = async () => {
        createReviewDto.productId = Number(productId);
        createReviewDto.userId = Number(getUserId());
        try {
            const res = await ReviewRepository.addNewReview(createReviewDto);
            if (res.ok) {
                toasts.success('Review added successfully');
                await fetchReviews();
                await getAverage();
            } else {
                const errorMessage = await res.json();
                toasts.error(errorMessage.message);
            }
        } catch (err) {
            toasts.error('An error occurred while adding review.');
        }
    }
    const addToCart = async () => {
        createCartItemDto.productId = Number(productId);
        createCartItemDto.cartId = cart.id;
        if (createCartItemDto.quantity > product.numberInStock) {
            toasts.error(`Not enough stock available. There are only ${product.numberInStock} items available.`);
            return;
        }

        try {
            const res = await CartItemRepository.createCartItem(createCartItemDto);
            if (res.ok) {
                toasts.success('Product added to cart');
            } else {
                const errorMessage = await res.json();
                toasts.error(errorMessage.message);
            }
        } catch (err) {
            toasts.error('An error occurred while adding product to cart.');
        }
    };

    onDestroy(async () => {
        const roomId = `Product/${$page.params.id}`
        io.emit("leaveRoom", roomId);
    });

    const goBack = () => {
        goto('/products');
    };
    const getStarClass = (starValue) => {
        if (average >= starValue) {
            return average < 2 ? 'star filled low' :
                average < 4 ? 'star filled medium' :
                    'star filled high';
        }
        return 'star';
    }
</script>
{#if product}
    <div class="product-details">
        <div class="product-image">
            <img src={product?.imageURL} alt={product?.name}/>
        </div>
        <div class="product-info">
            <h1>{product?.name}</h1>
            <p class="category">Category: {product?.category.name}</p>
            <p class="description">{product?.description}</p>
            <p class="price">Price: ${product?.price}</p>
            {#if average > 0}
                <div class="rating">
                    {#each [1, 2, 3, 4, 5] as starValue}
                        <span class={getStarClass(starValue)}>&#9733;</span>
                    {/each}
                    <span class="average">{average.toFixed(1)}</span>
                </div>
            {/if}
            {#if loggedInAndAdmin}
                <a href={`/products/${product?.id}/edit`} class="phone-card-link col-md-3">
                    Edit
                </a>
            {/if}
        </div>
        {#if product.numberInStock !== 0}
            {#if loggedInAndCustomer}
                <div class="add-to-cart">
                    <h3 class="text-xl font-medium">{product.name}</h3>
                    <p>Price: ${product.price}</p>
                    <label for="quantity">Quantity:</label>
                    <input type="number" min="1" max="{product.numberInStock}" class="form-control" id="quantity"
                           bind:value={createCartItemDto.quantity}/>

                    <button class="btn btn-primary mt-2" on:click|preventDefault={addToCart}>Add to Cart</button>
                </div>
            {:else}
                <h5>
                    Please login to add this product to your cart
                </h5>
            {/if}
        {:else}
            <p class="out-of-stock">Out of stock</p>
        {/if}
    </div>
    <div class="product-reviews">
        <h2>Reviews</h2>
        {#if loggedInAndCustomer}
            <div class="add-review">
                <h5>What do you think of this product? Share your experience to help others.</h5>
                <div class="d-flex justify-content-around">
                    <input type="text" placeholder="What do you think of this product?"
                           bind:value={createReviewDto.comment}
                           class="form-control w-50 mb-2"/>
                    <input type="number" min="1" max="5" placeholder="Rating" bind:value={createReviewDto.rating}
                           class="form-control w-25 mb-2"/>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-success" on:click|preventDefault={addReview}>Add review
                    </button>
                </div>
            </div>
        {:else}
            <h5>Please login to add a review for this product</h5>
        {/if}
        <div class="reviews">
            {#if reviews?.length > 0}
                {#each reviews as r}
                    <div class="row mt-3 mb-3">
                        <div class="col-1">
                            <img class="img-fluid"
                                 src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                                 alt=""/>
                        </div>
                        <div class="col-11 align-self-center">
                            <p class="text-dark-blue">{ r.user.fullName }</p>
                        </div>

                    </div>
                    <div class="d-flex mb-3">
                        <div class="d-inline-block">
                            {#each Array(r.rating) as _}
                                <img src="https://i.ibb.co/30NzvXX/star.png" alt="">
                            {/each}
                        </div>
                        <span class="text-muted ms-4">{new Date(r.reviewDate).toLocaleString()}</span>
                    </div>
                    <div class="mb-3">{r.comment}</div>
                    <hr>
                {/each}
            {:else}
                <p class="empty-message">No reviews available</p>
            {/if}
        </div>
    </div>
{/if}
<style>
    @import "./style.css";
</style>