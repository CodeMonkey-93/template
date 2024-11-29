<script setup lang="ts">
import type { NuxtError } from "#app";

const error: Ref<NuxtError<unknown> | null | undefined> = useError();
const handleError = async (): Promise<void> => {
  await clearError({ redirect: "/" });
};
</script>

<template>
  <NuxtLayout>
    <div>
      <h1>{{ error?.statusCode ?? 500 }}</h1>
      <h2>{{ error?.statusMessage ?? "Internal Server Error" }}</h2>
      <p>{{ error?.message ?? "Something went wrong." }}</p>
      <button @click="handleError">back</button>
    </div>
  </NuxtLayout>
</template>
