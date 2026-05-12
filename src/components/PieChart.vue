<script setup lang="ts">
import { VisSingleContainer, VisDonut, VisBulletLegend } from '@unovis/vue'

type DataRecord = { key: string; value: number }

const props = defineProps<{data: DataRecord[]}>();

const legendItems = Object.entries(props.data).map(([_, data]) => ({
  name: data.key.charAt(0).toUpperCase() + data.key.slice(1)
}))
</script>

<template>
  <VisBulletLegend :items="legendItems"/>
  <VisSingleContainer :height="400">
    <VisDonut
        :data="props.data"
        :value="d => d.value"
        :showEmptySegments="true"
        :padAngle="0"
        :arcWidth="0"
        class="z-0"
    />
  </VisSingleContainer>
</template>