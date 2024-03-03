<script>
  import { isUserLoggedIn, removeAuthToken } from "../helpers/helpers";
  import "../styles/global.css";
</script>

<header>
  <nav>
    <div class="title">
      <img src="" alt="site logo" />
      <h1><a href="/">PulseBuy</a></h1>
    </div>
    <div class="links">
      <a href="/">Home</a>
      <a href="/about-us">About Us</a>
      <a href="/products">Products</a>
      {#if isUserLoggedIn()}
        <a href="/profile">Profile</a>
        <button on:click={
            removeAuthToken
        }>Logout</button>
      {:else}
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      {/if}
    </div>
  </nav>
</header>

<style>
  .title {
    display: flex;
  }
  .title img {
    display: inline-block;
    filter: invert(88%) sepia(18%) saturate(886%) hue-rotate(199deg)
      brightness(100%) contrast(90%);
  }
  .title h1 {
    margin-left: 10px;
  }
  header {
    text-align: center;
    background: rgba(0, 0, 0, 0.1);
  }
  nav {
    display: flex;
    align-items: center;
    max-width: 960px;
    margin: 0 auto;
  }
  .links {
    margin-left: auto;
  }
  a {
    margin-left: 10px;
  }

  h1,
  a {
    color: white;
    font-weight: normal;
  }
</style>
