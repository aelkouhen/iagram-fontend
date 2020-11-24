<template>
  <v-app-bar app v-if="deployment">
    <v-list-item-avatar>
      <v-img
        :src="getPlateformIcon(deployment.deploymentProfile.target)"
      ></v-img>
    </v-list-item-avatar>

    <v-toolbar-title>{{ deployment.name }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-chip class="ma-2" :color="getStatusColor(deployment.status)" outlined>
      <v-icon left>
        {{ getStatusIcon(deployment.status) }}
      </v-icon>
      {{ deployment.status }}
    </v-chip>

    <v-btn
      :color="getActionColor(deployment.status)"
      :disabled="deployment.status == 'BLOCKED'"
      @click="execute(deployment.status)"
      class="ma-2 white--text"
    >
      {{ getActionName(deployment.status) }}
      <v-icon right dark>
        {{ getActionIcon(deployment.status) }}
      </v-icon>
    </v-btn>

    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
<script>
import API from "../services/Api";
import swal from "sweetalert";

export default {
  data() {
    return {};
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
    getActionIcon(status) {
      switch (status) {
        case "BLOCKED":
          return "mdi-block-helper";
        case "READY":
          return "mdi-play";
        case "RUNNING":
          return "mdi-stop";
        default:
          return "mdi-replay";
      }
    },
    getActionColor(status) {
      switch (status) {
        case "BLOCKED":
          return "grey";
        case "RUNNING":
          return "red";
        default:
          return "green";
      }
    },
    getActionName(status) {
      switch (status) {
        case "BLOCKED":
          return "Deploy";
        case "READY":
          return "Deploy";
        case "RUNNING":
          return "Dispose";
        default:
          return "Re-Deploy";
      }
    },
    failure(message) {
      swal({
        title: "Error!",
        text: message,
        icon: "error",
        button: {
          text: "OK",
          value: true,
          visible: true,
          closeModal: true,
        },
      });
    },
    async execute(status) {
      switch (status) {
        case "READY":
          //this.$store.dispatch("deactivateViewMode");
          await this.$store.dispatch("resetDeploymentAction");

          // eslint-disable-next-line no-case-declarations
          let i = 1;
          // eslint-disable-next-line no-case-declarations
          let deploymentStatus = "RUNNING";
          for (const step of this.sortedSteps) {
            // eslint-disable-next-line no-unused-vars
            let stepStatus = "EXECUTED";
            let j = 0;
            for (const artifact of step.artifacts) {
              const response = await this.deployArtifact(artifact, j++);
              if (response == 200) {
                await this.refreshDeployment(this.deployment.id);
              } else {
                stepStatus = "ERRORED";
                deploymentStatus = "ERRORED";
                await this.executeStep(step, i, stepStatus);
                await this.updateDeployment(
                  this.deployment.id,
                  deploymentStatus
                );
                await this.refreshAccount();
                return;
              }
            }
            await this.executeStep(step, ++i, stepStatus);
          }
          await this.updateDeployment(this.deployment.id, deploymentStatus);
          await this.refreshAccount();
          //this.$store.dispatch("activateViewMode");

          break;
        case "RUNNING":
          //todo
          break;
        default:
          break;
      }
    },
    async refreshDeployment(id) {
      const response = await API.getDeployment(id);
      const data = await response.json();
      await this.$store.dispatch("updateSelectedDeploymentAction", data);
    },
    async executeStep(step, index, status) {
      const response = await API.updateStepStatus(step.id, status);
      const data = await response.json();

      if ((await response.status) == 200) {
        await this.$store.dispatch("updateSelectedStepAction", data);
        await this.$store.dispatch("updateCurrentStepIndexAction", index);
        return response.status;
      } else {
        this.failure(data.message);
        return response.status;
      }
    },
    async updateDeployment(id, status) {
      const response = await API.updateDeploymentStatus(id, status);
      const data = await response.json();
      await this.$store.dispatch("updateSelectedDeploymentAction", data);
    },
    async deployArtifact(artifact, index) {
      const response = await API.deployArtifact(
        artifact.id,
        this.getProfile(this.deployment.deploymentProfile)
      );
      const data = await response.json();

      if ((await response.status) == 200) {
        await this.$store.dispatch("updateSelectedArtifactAction", data);
        await this.$store.dispatch("updateCurrentArtifactIndexAction", index);
        await this.$store.dispatch("addDeployedArtifactsAction", data);
        return response.status;
      } else {
        this.failure(data.message);
        return response.status;
      }
    },
    getProfile(deploymentProfile) {
      return {
        name: deploymentProfile.name,
        credentialId: deploymentProfile.credential.id,
        target: deploymentProfile.target,
      };
    },
    refreshAccount() {
      this.$nextTick(function() {
        API.getAccountByEmail("amine.elkouhen@gmail.com")
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch("updateAccountAction", response.data);
            } else {
              this.failure(response.message);
            }
          })
          .catch((error) => {
            this.failure(error.message);
          });
      });
    },
  },
  computed: {
    deployment() {
      return this.$store.state.selectedDeployment;
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
  watch: {
    // eslint-disable-next-line no-unused-vars
    deployment(newObject, oldObject) {
      //console.log(`We have deployment ${newObject.id} now !`);
    },
  },
};
</script>
