<template>
  <v-card v-if="deployment">
    <v-subheader>Execution Plan</v-subheader>
    <v-stepper
      v-model="currentStep"
      v-for="step in sortedSteps"
      :key="step.id"
      vertical
    >
      <v-stepper-step
        :rules="[() => !isErrored(step)]"
        :complete="step.status == 'EXECUTED'"
        :step="step.priority"
      >
        {{ step.name }}
        <small v-if="step.status == 'EXECUTED'">
          executed at: {{ getDateTime(step.executionTimestamp) }}</small
        >
      </v-stepper-step>

      <v-stepper-content :step="step.priority">
        <v-list>
          <v-list-item-group :value="currentArtifact">
            <v-list-item v-for="artifact in step.artifacts" :key="artifact.id">
              <v-list-item-avatar color="grey darken-1"> </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ artifact.name }}</v-list-item-title>

                <v-list-item-subtitle>
                  {{ artifact.specificName }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <!--<v-divider v-if="n !== 3" :key="`divider-${n}`" inset></v-divider>-->
              <v-list-item-action>
                <v-list-item-action-text>{{
                  getDateTime(artifact.deploymentTimestamp)
                }}</v-list-item-action-text>
                <v-icon
                  :color="getStatusColor(artifact.status) + ' lighten-1'"
                  >{{ getStatusIcon(artifact.status) }}</v-icon
                >
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <template v-if="viewMode">
          <v-btn
            color="primary"
            @click="nextStep()"
            :disabled="step.priority == sortedSteps.length"
          >
            Next
          </v-btn>
          <v-btn
            color="primary"
            @click="previousStep()"
            :disabled="step.priority == 1"
          >
            Back
          </v-btn>
        </template>
      </v-stepper-content>
    </v-stepper>
  </v-card>
</template>

<script>
//import DeploymentStep from "@/components/DeploymentStep.vue";

export default {
  components: {
    //DeploymentStep,
  },
  data() {
    return {};
  },
  computed: {
    currentStep() {
      return this.$store.state.currentStepIndex;
    },
    currentArtifact() {
      return this.$store.state.currentArtifactIndex;
    },
    deployment() {
      return this.$store.state.selectedDeployment;
    },
    viewMode() {
      return this.$store.state.viewMode;
    },
    sortedSteps: function() {
      function compare(a, b) {
        if (a.priority < b.priority) return -1;
        if (a.priority > b.priority) return 1;
        return 0;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.deployment.steps.sort(compare);
    },
  },
  methods: {
    getDateTime(timestamp) {
      return new Date(timestamp).toLocaleString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },
    isErrored(step) {
      return step.status == "ERRORED";
    },
    nextStep() {
      this.$store.dispatch(
        "updateCurrentStepIndexAction",
        this.currentStep + 1
      );
    },
    previousStep() {
      this.$store.dispatch(
        "updateCurrentStepIndexAction",
        this.currentStep - 1
      );
    },
    getStatusIcon(status) {
      switch (status) {
        case "READY":
          return "mdi-circle-double";
        case "DEPLOYED":
          return "mdi-check-circle-outline";
        case "ERRORED":
          return "mdi-close-circle-outline";
      }
    },
    getStatusColor(status) {
      switch (status) {
        case "READY":
          return "grey";
        case "DEPLOYED":
          return "green";
        case "ERRORED":
          return "red";
      }
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    deployment(newObject, oldObject) {
      //console.log(`We have deployment ${newObject.id} now !`);
    },
  },
};
</script>
