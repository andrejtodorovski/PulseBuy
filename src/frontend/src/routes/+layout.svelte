<script>
  import Footer from "$lib/footer.svelte";
  import Nav from "$lib/nav.svelte";
  import { FlatToast, ToastContainer, toasts } from "svelte-toasts";
  import ChatButton from "$lib/chat-button.svelte";
  import { setUpSessionCookie } from "../helpers/helpers";
  import { onMount } from "svelte";

  const showToast = () => {
        const toast = toasts.add({
            title: "Message title",
            description: "Message body",
            duration: 10000,
            placement: "bottom-right",
            type: "info",
            theme: "dark",
            onClick: () => {
            },
            onRemove: () => {
            }
        });
    };

    onMount(async () => {
        await setUpSessionCookie();
    })

</script>
<Nav/>
<main class="main-container">
    <ToastContainer placement="top-right" let:data={data}>
        <FlatToast {data}/>
    </ToastContainer>
    <slot></slot>
</main>
<ChatButton/>
<Footer/>