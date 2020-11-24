<template>
  <v-app id="inspire">
    <SystemBar app />
    <ApplicationBar app />
    <NavigationSidebar app />
    <ContentViewer app />
    <!--<FooterBar app />
    <BottomNavigationBar app />-->
  </v-app>
</template>

<script>
import SystemBar from "@/components/SystemBar.vue";
import ApplicationBar from "@/components/ApplicationBar.vue";
import NavigationSidebar from "@/components/NavigationSidebar.vue";
import ContentViewer from "@/components/ContentViewer.vue";
//import FooterBar from "@/components/FooterBar.vue";
//import BottomNavigationBar from "@/components/BottomNavigationBar.vue";
import API from "../services/Api";
import swal from "sweetalert";

export default {
  data() {
    return {
      account: {},
    };
  },
  created() {
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
  components: {
    SystemBar,
    ApplicationBar,
    NavigationSidebar,
    ContentViewer,
    //FooterBar,
    //BottomNavigationBar,
  },
  methods: {
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
  },
};
</script>
