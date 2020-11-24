<template>
  <div v-if="step">
    <v-stepper-step :complete="step.executed" :step="step.priority">
      {{ step.name }}
      <small v-if="step.executed">
        executed: {{ step.executionTimestamp }}</small
      >
    </v-stepper-step>

    <v-stepper-content :step="step.priority">
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="artifact in step.artifacts" :key="artifact.id">
            <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ artifact.name }}</v-list-item-title>

              <v-list-item-subtitle>
                {{ artifact }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <!--<v-divider v-if="n !== 3" :key="`divider-${n}`" inset></v-divider>-->
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-btn color="primary">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>
  </div>
</template>

<script>
export default {
  props: ["step", "model"],
};
</script>
