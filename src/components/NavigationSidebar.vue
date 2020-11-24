<template>
  <v-navigation-drawer width="300" app>
    <v-list v-if="account">
      <v-list-item>
        <v-list-item-avatar v-if="account.accountPhoto">
          <v-img
            :src="'data:image/jpeg;base64,' + account.accountPhoto"
          ></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ account.firstName + " " + account.lastName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ account.email }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-icon>mdi-menu-down</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-btn class="ma-2" outlined color="indigo">
      <v-icon color="indigo lighten-1'">mdi-plus</v-icon>
      New Deployment
    </v-btn>
    <v-list shaped v-if="account">
      <v-list-item-group active-class="border" v-model="model" color="indigo">
        <v-list-item
          v-for="deployment in account.deployments"
          :key="deployment.id"
          link
          @change="selectDeployment(deployment)"
        >
          <v-list-item-avatar>
            <v-img
              :src="getPlateformIcon(deployment.deploymentProfile.target)"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ deployment.name }}</v-list-item-title>
            <v-list-item-subtitle>
              Step count: {{ deployment.stepCount }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              Artifacts count: {{ deployment.artifactCount }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-action-text>duration (2h)</v-list-item-action-text>
            <v-icon :color="getStatusColor(deployment.status) + ' lighten-1'">{{
              getStatusIcon(deployment.status)
            }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {},
  data: () => ({
    model: null,
  }),
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  watch: {
    model: function() {
      if (this.model == null) this.selectDeployment(null);
    },
  },
  methods: {
    getPlateformIcon(target) {
      switch (target) {
        case "AWS":
          return require("../assets/" + target + ".png");
        case "GCP":
          return require("../assets/" + target + ".png");
        case "AZURE":
          return require("../assets/" + target + ".png");
        case "OCI":
          return require("../assets/" + target + ".png");
        case "ALIBABA":
          return require("../assets/" + target + ".png");
      }
    },
    getStatusIcon(status) {
      switch (status) {
        case "BLOCKED":
          return "mdi-block-helper";
        case "READY":
          return "mdi-circle-double";
        case "RUNNING":
          return "mdi-check-circle-outline";
        case "INCONSISTENT":
          return "mdi-alert-circle-outline";
        case "ERRORED":
          return "mdi-close-circle-outline";
      }
    },
    getStatusColor(status) {
      switch (status) {
        case "BLOCKED":
          return "red";
        case "READY":
          return "grey";
        case "RUNNING":
          return "green";
        case "INCONSISTENT":
          return "orange";
        case "ERRORED":
          return "red";
      }
    },
    selectDeployment(deployment) {
      this.$store.dispatch("updateSelectedDeploymentAction", deployment);
      this.$store.dispatch("clearDeployedArtifactsAction");
    },
  },
};
</script>

<style scoped>
.border {
  border: 2px dashed orange;
}
</style>
