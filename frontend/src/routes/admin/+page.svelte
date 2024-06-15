<script lang="ts">

    import { isUserAdmin } from "../../helpers/helpers";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    onMount(async () => {
    if (!isUserAdmin()) {
      await goto("/unauthorized");
    }
  });
</script>
<div class="container mt-5">
  <h1 class="text-center mb-5">Admin pages</h1>
  <div class="admin-page-grid">
    <a href="/admin/users">
      <div class="card text-center p-4 flex-fill mx-2">
        <div class="card-body">
          <div class="card-icon text-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor"
                 class="bi bi-person-fill-gear" viewBox="0 0 16 16">
              <path
                d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
            </svg>
          </div>
          <h5 class="text-dark-blue">Manage user permissions</h5>
        </div>
      </div>
    </a>
    <a href="/admin/sales">
      <div class="card text-center p-4 flex-fill mx-2">
        <div class="card-body">
          <div class="card-icon text-danger">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor"
                 class="bi bi-cash-coin" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
              <path
                d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
              <path
                d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
            </svg>
          </div>
          <h5 class="text-dark-blue">Manage sales</h5>
        </div>
      </div>
    </a>
    <a href="/admin/add-product">
      <div class="card text-center p-4 flex-fill mx-2">
        <div class="card-body">
          <div class="card-icon text-warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor"
                 class="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </div>
          <h5 class="text-dark-blue">Add a new product</h5>
        </div>
      </div>
    </a>
    <a href="/admin/add-category">
      <div class="card text-center p-4 flex-fill mx-2">
        <div class="card-body">
          <div class="card-icon text-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor"
                 class="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </div>
          <h5 class="text-dark-blue">Add a new category</h5>
        </div>
      </div>
    </a>
    <a href="/admin/manage-stock">
      <div class="card text-center p-4 flex-fill mx-2">
        <div class="card-body">
          <div class="card-icon text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor"
                 class="bi bi-box" viewBox="0 0 16 16">
              <path
                d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
            </svg>
          </div>
          <h5 class="text-dark-blue">Manage stock</h5>
        </div>
      </div>
    </a>
    <a href="/admin/customer-support">
      <div class="card text-center p-4 flex-fill mx-2">
        <div class="card-body">
          <div class="card-icon text-success">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-telephone"
                 viewBox="0 0 16 16">
              <path
                d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
            </svg>
          </div>
          <h5 class="text-dark-blue">Customer support</h5>
        </div>
      </div>
    </a>
  </div>
</div>
<style>
    .card {
        transition: transform 0.3s, box-shadow 0.3s;
        overflow: hidden;
    }

    .admin-page-grid {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-row: auto;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
    }

    .card:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    .card-icon {
        font-size: 3rem;
        margin-bottom: 15px;
        transition: transform 0.3s;
    }

    .card:hover .card-icon {
        transform: translateY(-10px);
    }

</style>
