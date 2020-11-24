<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <DiagramViewer />
        </v-col>

        <v-col cols="6">
          <ExecutionPlan app />
        </v-col>

        <v-col cols="6">
          <DeploymentTimeline app />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import DiagramViewer from "@/components/DiagramViewer.vue";
import ExecutionPlan from "@/components/ExecutionPlan.vue";
import DeploymentTimeline from "@/components/DeploymentTimeline.vue";

export default {
  components: {
    DiagramViewer,
    ExecutionPlan,
    DeploymentTimeline,
  },
};
</script>
