<template>
    <v-tabs v-model="step" ref="top" class="my-4 mx-auto d-print-none">
        <v-tab v-for="(item, index) in tabs" :key="index" :value="index + 1" :disabled="index >= step" class="mx-auto">
            {{ item }}
        </v-tab>
    </v-tabs>

    <v-card max-width="900" class="mx-auto">
        <v-card-title class="d-print-none text-h6 font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar color="primary" size="24" class="ml-2">{{ step }}</v-avatar>
        </v-card-title>

        <v-window v-model="step" :touch="false">
            <slot></slot>
        </v-window>

        <v-divider></v-divider>
        <v-card-actions class="d-print-none">
            <v-btn v-if="step > 1" variant="text" @click.prevent="goBack" class="m-3">
                Atrás
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="step < tabs.length" color="primary" variant="flat" @click.prevent="goNext" :disabled="!valid">
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
            this.scrollToTop();
            this.step--;
        },
        goNext() {
            this.scrollToTop();
            this.step++;
        },

        scrollToTop() {
            const el = this.$refs.top.$el;
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        },
    },

    computed: {
        currentTitle() {
            return this.tabs[this.step - 1];
        },
    },

    watch: {
        step(newValue, oldValue) {
            if (newValue < oldValue) {
                this.$emit('back', this.step)
            } else {
                this.$emit('next', this.step)
            }
        }
    },

    emits: ['back', 'next'],
}
</script>
