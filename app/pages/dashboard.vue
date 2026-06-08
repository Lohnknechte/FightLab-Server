<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const { data, pending, error, refresh } = await useFetch('/api/db_values', {
  key: 'db_values',
})

const lobbyRows = computed(() => {
  const value = data.value?.lobby
  return Array.isArray(value) ? value : []
})

const columns = computed(() => {
  const firstRow = lobbyRows.value[0]
  return firstRow ? Object.keys(firstRow) : []
})

const formatCell = (value: unknown) => {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}
</script>

<template>
  <main class="page-shell">
    <section class="hero-card">
      <div class="hero-copy">
        <p class="eyebrow">Database Inspector</p>
        <h1>Lobby</h1>
        <p class="hero-text">
          View all lobby rows in one place with loading, empty, and error states.
        </p>
      </div>

      <button class="refresh-btn" type="button" @click="refresh()">
        Refresh
      </button>
    </section>

    <section v-if="error" class="state-card state-card--error">
      <div class="state-icon">!</div>
      <div>
        <h2>Could not load lobby data</h2>
        <p>{{ error.message }}</p>
      </div>
    </section>

    <section v-else-if="pending" class="table-card">
      <div class="table-toolbar">
        <div>
          <p class="toolbar-label">Status</p>
          <h2>Loading lobby rows</h2>
        </div>
      </div>

      <div class="skeleton-table">
        <div class="skeleton-row" v-for="i in 8" :key="i">
          <span v-for="j in 6" :key="j" class="skeleton-cell" />
        </div>
      </div>
    </section>

    <section v-else-if="!lobbyRows.length" class="state-card">
      <div class="state-icon">○</div>
      <div>
        <h2>No lobby rows found</h2>
        <p>
          The request worked, but the <code>lobby</code> table currently has no rows to display.
        </p>
      </div>
    </section>

    <section v-else class="table-card">
      <div class="table-toolbar">
        <div>
          <p class="toolbar-label">Rows</p>
          <h2>{{ lobbyRows.length }} entries</h2>
        </div>

        <div class="toolbar-meta">
          <span class="meta-pill">{{ columns.length }} columns</span>
          <span class="meta-pill">Live view</span>
        </div>
      </div>

      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th v-for="column in columns" :key="column">
                {{ column }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(row, rowIndex) in lobbyRows" :key="row.id ?? rowIndex">
              <td class="row-index">{{ rowIndex + 1 }}</td>
              <td
                v-for="column in columns"
                :key="`${rowIndex}-${column}`"
                :title="formatCell(row[column])"
              >
                {{ formatCell(row[column]) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>