<script lang="ts">
  import "../styles/global.css";
  import NewsletterRepository from "../repository/newsletterRepository";
  import { CreateNewsletterDto } from "../models/newsletter";
  import { toasts } from "svelte-toasts";

  let newsletter = new CreateNewsletterDto();

    const subscribeToNewsletter = async () => {
        try {
            const res = await NewsletterRepository.subscribeToNewsletter(newsletter);

            if (res.ok) {
                toasts.success("You have successfully subscribed to our newsletter!");
            } else {
                const errorMessage = await res.json();
                toasts.error(errorMessage.message);
            }
        } catch (error) {
            toasts.error("An error occurred while subscribing to our newsletter. Please try again later.");
        }
    };
</script>

<footer class="text-center p-4 mt-5">
    <div class="container pb-3">
        <div class="row d-flex justify-content-center">
            <div class="col-md-4 pt-2">
                <img
                        src="https://i.ibb.co/Nx37JfH/image-2024-03-22-004420115.png"
                        class="logo"
                        alt="logo"
                        width="250"
                />
            </div>
            <div class="col-md-4 pt-2">
                <p class="d-flex justify-content-center align-items-center">
                    <a href="/about-us"> About us </a>
                </p>
                <p class="d-flex justify-content-center align-items-center">
                    <a href="/contact">Contact</a>
                </p>
            </div>
            <div class="col-md-4 pt-2">
                <div
                        class="d-flex flex-column justify-content-center align-items-center"
                >
                    <h5>Subscribe to our Newsletter</h5>
                    <form class="d-flex" on:submit|preventDefault={subscribeToNewsletter}>
                        <input
                                type="email"
                                placeholder="Enter your email"
                                class="form-control me-2"
                                bind:value={newsletter.email}
                        />
                        <button type="submit" class="btn btn-light">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="text-center p-1"><span>© 2024 Copyright: PulseBuy</span></div>
</footer>

<style>
    footer {
        background-color: var(--darkest-blue);
    }

    span, h5 {
        color: var(--gray);
    }
</style>
