<script setup lang="ts">
import type { UseWebSocketReturn } from "@vueuse/core";

// If prod, check if it's secure and use wss://
const { status, data, send, open, close }: UseWebSocketReturn<string> =
  useWebSocket(`ws://localhost:3000/api/ws`, {
    autoReconnect: {
      retries: 3,
      delay: 1000,
      onFailed: (): void => {
        alert("Failed to connect WebSocket after 3 retries");
      },
    },
    heartbeat: {
      message: "ping",
      responseMessage: "pong",
      interval: 1000,
      pongTimeout: 1000,
    },
  });
const message: Ref<string> = ref("");
const history: Ref<string[]> = ref<string[]>([]);

watch(data, (value: string | null): void => {
  if (!value) return;
  history.value.push(`server: ${value}`);
});

const sendMessage = (): void => {
  history.value.push(`client: ${message.value}`);
  send(message.value);
  message.value = "";
};
</script>

<template>
  <form @submit.prevent="sendMessage">
    <input v-model="message" type="text" />
    <button type="submit">send</button>
  </form>
  <ul>
    <li v-for="entry in history">
      {{ entry }}
    </li>
  </ul>
</template>
