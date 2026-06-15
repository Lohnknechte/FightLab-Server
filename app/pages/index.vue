<template>
  <main class="server-page">
    <section class="server-wrap">
      <p class="server-kicker">Fight-Lab</p>

      <h1 class="server-title">Server page</h1>

      <p class="server-text">
        General information for the Fight-Lab server.
      </p>

      <p class="server-meta">
        <span>Runtime {{ runtime }}</span>
        <span class="server-meta__dot" aria-hidden="true"></span>
        <code>/server</code>
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Fight-Lab Server'
})

const runtime = ref('0s')
const startedAt = Date.now() - ((4 * 24 + 13) * 60 * 60 + 27 * 60 + 12) * 1000

let intervalId: ReturnType<typeof setInterval> | null = null

function formatRuntime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const parts: string[] = []
  if (days) parts.push(`${days}d`)
  if (hours || days) parts.push(`${hours}h`)
  if (minutes || hours || days) parts.push(`${minutes}m`)
  parts.push(`${seconds}s`)

  return parts.join(' ')
}

function updateRuntime() {
  runtime.value = formatRuntime(Date.now() - startedAt)
}

onMounted(() => {
  updateRuntime()
  intervalId = setInterval(updateRuntime, 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>