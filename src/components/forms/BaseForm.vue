<template>
    <v-tabs v-model="step" class="my-4 mx-auto">
        <v-tab v-for="(item, index) in tabs" :key="index" :value="index + 1" :disabled="index >= step" class="mx-auto">
            {{ item }}
        </v-tab>
    </v-tabs>

    <v-card width="800" class="mx-auto">
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar color="primary" size="24" class="ml-2">{{ step }}</v-avatar>
        </v-card-title>

        <v-window v-model="step">
            <slot></slot>
        </v-window>

        <v-divider></v-divider>
        <v-card-actions>
            <v-btn v-if="step > 1" variant="text" @click="goBack" class="m-3">
                Atrás
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="step < tabs.length" color="primary" variant="flat" @click="goNext">
                <!-- :disabled="!valid" -->
                Siguiente
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        valid: Boolean,
        tabs: Array[String],
    },

    data: () => ({
        step: 1,
    }),

    methods: {
        goBack() {
            this.step--;
        },
        goNext() {
            this.step++;
        },
    },

    computed: {
        currentTitle() {
            return this.tabs[this.step - 1];
        },
    },
}
</script>
