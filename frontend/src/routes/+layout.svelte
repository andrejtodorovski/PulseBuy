<script>
  import Footer from "$lib/footer.svelte";
import Nav from "$lib/nav.svelte";
import { toasts, ToastContainer, FlatToast, BootstrapToast }  from "svelte-toasts";

  const showToast = () => {
    const toast = toasts.add({
      title: 'Message title',
      description: 'Message body',
      duration: 10000,
      placement: 'bottom-right',
      type: 'info',
      theme: 'dark',
      onClick: () => {},
      onRemove: () => {},
    });
  };
</script>
<Nav/>
<main class="main-container">
  <ToastContainer placement="top-right" let:data={data}>
    <FlatToast {data} />
  </ToastContainer>    
  <slot></slot>
</main>
<Footer/>