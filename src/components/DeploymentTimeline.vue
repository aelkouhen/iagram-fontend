<template>
  <v-card v-if="deployment">
    <v-subheader>Deployment Timeline</v-subheader>
    <v-timeline v-for="artifact in timeline" :key="artifact.id" align-top dense>
      <v-timeline-item large>
        <template v-slot:icon>
          <v-avatar color="grey darken-1">
            <!--<img src="http://i.pravatar.cc/64" />-->
          </v-avatar>
        </template>
        <v-row class="pt-1">
          <v-col cols="3">
            <small>{{ getDateTime(artifact.deploymentTimestamp) }}</small>
          </v-col>
          <v-col>
            <strong>{{ artifact.name }}</strong>
            <div class="caption">
              {{ artifact.specificName }}
            </div>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<script>
export default {
  created() {
    //
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
  },
  computed: {
    deployedArtifacts() {
      return this.$store.getters.getDeployedArtifacts;
    },
    deployment() {
      return this.$store.state.selectedDeployment;
    },
    timeline() {
      return this.deployedArtifacts.slice().reverse();
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    deployedArtifacts(newObject, oldObject) {
      //console.log(`We have deployment ${newObject.id} now !`);
    },
    // eslint-disable-next-line no-unused-vars
    deployment(newObject, oldObject) {
      //console.log(`We have deployment ${newObject.id} now !`);
    },
  },
};
</script>
