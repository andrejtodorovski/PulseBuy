<script>
  import Footer from "$lib/footer.svelte";
import Nav from "$lib/nav.svelte";
</script>
<Nav/>
<main class="main-container">
    <slot></slot>
</main>
<Footer/>