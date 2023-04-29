<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";
import {
	ViewportController,
} from "@/domain/ViewportController";

const viewport = ref<HTMLDivElement | undefined>();
const { width, height } = useWindowSize();

let viewportController: ViewportController;

onMounted(() => {
	const canvas = document.createElementNS(
		"http://www.w3.org/1999/xhtml",
		"canvas"
	) as HTMLCanvasElement;

	if (!viewport.value) {
		return
	}


	viewportController = new ViewportController(canvas, viewport.value);
	viewportController.setSize(window.innerWidth, window.innerHeight);

	viewport.value.appendChild(canvas);
});

watch([width, height], ([newWidth, newHeight]) => {
	viewportController?.setSize(newWidth, newHeight);
});
</script>

<template>
	<div ref="viewport" class="overflow-hidden" />
</template>
