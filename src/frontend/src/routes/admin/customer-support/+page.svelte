<script lang="ts">
    import { writable } from "svelte/store";
    import { interceptedFetch, isUserAdmin } from "../../../helpers/helpers.js";
    import { type Chat, Message, SendMessageDto } from "../../../models/message";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import MessagesRepository from "../../../repository/messagesRepository";
    import { io } from "$lib/webSocketConnection";

    const chats = writable<Chat[]>([]);
    const messages = writable(<Message[]>([]));

    let selectedChat: Chat | null = null;
    let newMessage = '';

    async function selectChat(chat) {
        selectedChat = chat;
        await loadMessages(chat.id)
    }

    async function loadChats() {
        const res = await interceptedFetch('/chat/admin-chats', {})
        const response = await res.json()
        if (res.ok) {
            chats.set(response);
        }
    }

    async function loadMessages(chatId) {
        const res = await interceptedFetch(`/message/messages-by-chat/${chatId}`, {})
        const response = await res.json()
        if (res.ok) {
            messages.set(response);
        } else {
            messages.set([]);
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    async function sendMessage() {
        let sendMessageDto;
        if (newMessage === '') {
            return
        }
        if (selectedChat != null) {
            if (selectedChat.userId == null) {
                sendMessageDto = new SendMessageDto(
                    newMessage,
                    selectedChat.cookie,
                    null,
                    true
                )
            } else {
                sendMessageDto = new SendMessageDto(
                    newMessage,
                    null,
                    selectedChat.userId,
                    true
                )
            }
        } else {
            return;
        }
        newMessage = '';
        await MessagesRepository.sendMessage(sendMessageDto)
        await selectChat(selectedChat);
    }

    onMount(async () => {
        const roomId = "Message";

        io.emit("joinRoom", roomId);

        io.on("Message.MessageSentByUserEvent", (event) => {
            loadMessages(event.id)
        });
        if (!isUserAdmin()) {
            await goto("/unauthorized")
        } else {
            await loadChats();
        }
    });
</script>
<div class="main-container container">
    <div class="row">
        <div class="col-md-3 chat-list bg-light p-3">
            <h5>Chats</h5>
            <ul class="list-group">
                {#each $chats as chat}
                    <li class="list-group-item {selectedChat && selectedChat.id === chat.id ? 'active' : ''}"
                        on:click={() => selectChat(chat)}>
                        {chat.userName}
                    </li>
                {/each}
            </ul>
        </div>
        <div class="col-md-9 p-3 d-flex flex-column">
            {#if selectedChat}
                <div class="card chat-interface">
                    <div class="card-header d-flex align-items-center justify-content-between">
                        <span>{selectedChat.userName}</span>
                    </div>
                    <div class="card-body chat-body">
                        {#each $messages as msg}
                            {#if msg.isAdminReply}
                                <div class="message support">
                                    {msg.content}
                                </div>
                            {:else}
                                <div class="message customer">
                                    {msg.content}
                                </div>
                            {/if}
                        {/each}
                    </div>
                </div>
                <div class="card-footer d-flex">
                    <input type="text" class="form-control" placeholder="Type your message..." bind:value={newMessage} on:keydown={handleKeyDown}>
                    <button class="btn my-button" on:click={sendMessage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             class="bi bi-send"
                             viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                        </svg>
                    </button>
                </div>
            {:else}
                <div>Select a chat to view messages</div>
            {/if}
        </div>
    </div>
</div>

<style>

    .card-header {
        background-color: var(--darkest-blue);
        color: var(--gray);
        padding: 10px 15px;
        font-size: 1.25rem;
    }

    .my-button {
        background-color: var(--darkest-blue);
        color: var(--gray);
    }

    .message {
        padding: 10px 15px;
        border-radius: 20px;
        margin-bottom: 10px;
        max-width: 80%;
        word-wrap: break-word;
    }

    .message.customer {
        background-color: var(--blue);
        align-self: flex-start;
    }

    .message.support {
        background-color: var(--dark-blue);
        color: white;
        align-self: flex-end;
    }

    .card-body.chat-body {
        flex: 1;
        overflow-y: auto;
        padding: 15px;
        background-color: #f8f9fa;
        display: flex;
        flex-direction: column;
    }

    .chat-list {
        max-height: 100vh;
        overflow-y: auto;
    }

</style>
