<script lang="ts" setup>
defineRouteRules({
	prerender: true,
});

const t = useTranslations();

const res = await useFetch("/api/auth/me");

usePageMetadata({
	title: t("IndexPage.meta.title"),
});
</script>

<template>
	<MainContent class="container grid content-start gap-y-8 py-8">
		<PageTitle>{{ t("IndexPage.title") }}</PageTitle>
		{{ res.data }}
	</MainContent>
</template>
