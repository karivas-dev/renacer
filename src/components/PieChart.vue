<script setup lang="ts">
import {VisSingleContainer, VisDonut, VisBulletLegend, VisAnnotations} from "@unovis/vue";

type DataRecord = { key: string; value: number; color: string };

const props = defineProps<{ data: DataRecord[], annotations }>();

const legendItems = Object.entries(props.data).map(([_, data]) => ({
  name: data.key.charAt(0).toUpperCase() + data.key.slice(1),
  color: data.color,
}));
</script>

<template>
  <VisSingleContainer>
    <VisDonut
      :data="props.data"
      :value="(d) => d.value"
      :showEmptySegments="true"
      :padAngle="0"
      :arcWidth="0"
      :arcLabel="d =>`${d.value}%`"
      :color="(d) => d.color"
      class="z-0"
    />
    <VisAnnotations
        :items="annotations"
    />
  </VisSingleContainer>
</template>

<style scoped>
:root {
  --vis-annotations-connector-stroke-color: #444;
  --vis-annotations-connector-stroke-width: 1px;
  --vis-annotations-connector-stroke-dasharray: none;

  --vis-annotations-subject-stroke-color: #444;
  --vis-annotations-subject-fill-color: none;
  --vis-annotations-subject-stroke-dasharray: none;
}
</style>
