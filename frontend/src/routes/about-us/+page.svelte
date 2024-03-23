<script>
  import { onMount } from "svelte";
  onMount(() => {
    document.title = "About PulseBuy";
  });
  import "../../styles/global.css";
</script>

<div class="container mt-5">
  <h1 class="text-center mb-4">About PulseBuy</h1>
  <div class="row p-3">
    <div class="col-md-6">
      <div class="card custom-card mb-4">
        <div class="card-body p-5">
          <h5 class="card-title">Our Mission</h5>
          <p class="card-text">At PulseBuy, our mission is to provide you with the latest mobile phones at affordable prices, ensuring that you stay connected and productive wherever you go.</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card custom-card mb-4">
        <div class="card-body p-5">
          <h5 class="card-title">Quality Assurance</h5>
          <p class="card-text">We carefully select each smartphone in our inventory to ensure that it meets our high standards of quality, reliability, and performance.</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card custom-card mb-4">
        <div class="card-body p-5">
          <h5 class="card-title">Expert Advice</h5>
          <p class="card-text">Our team of experts is here to help you find the perfect phone for your needs, offering personalized recommendations and expert advice every step of the way.</p>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card custom-card mb-4">
        <div class="card-body p-5">
          <h5 class="card-title">Customer Satisfaction</h5>
          <p class="card-text">Your satisfaction is our top priority. We strive to provide you with a seamless shopping experience, from real-time inventory updates to friendly customer support.</p>
        </div>
      </div>
    </div>
  </div>
</div>
<style>
  .card-body{
    min-height: 30vh;
  }
  h1 {
    color: var(--darkest-blue);
  }
  p, h5 {
    color: var(--gray);
  }
</style>