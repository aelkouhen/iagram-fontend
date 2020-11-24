import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viewMode: true,
    account:null,
    deployedArtifacts:[],
    selectedDeployment: null,
    currentStepIndex:1,
    currentArtifactIndex:-1,
    selectedStep: null,
    selectedArtifact: null
  },
  mutations: {
    updateAccount(state, account){
      state.account = account
    },
    updateSelectedDeployment(state, deployment) {
      state.selectedDeployment = deployment
    },
    updateSelectedStep(state, step) {
      state.selectedStep = step
    },
    updateCurrentStepIndex(state, index) {
      state.currentStepIndex = index
    },
    updateCurrentArtifactIndex(state, index) {
      state.currentArtifactIndex = index
    },
    updateSelectedArtifact(state, artifact) {
      state.selectedArtifact = artifact
    },
    activateView(state) {
      state.viewMode = true
    },
    deactivateView(state) {
      state.viewMode = false
    },
    resetDeployment(state){
      state.currentArtifactIndex = 0;
      state.currentStepIndex = 1;
      state.deployedArtifacts = [];
    },
    addDeployedArtifacts(state, artifact){
      state.deployedArtifacts.push(artifact)
    },
    clearDeployedArtifacts(state){
      state.deployedArtifacts = []
    }
  },
  getters: {
    getDeployedArtifacts: state => {
      if (state.deployedArtifacts.length == 0) 
        if (state.selectedDeployment)      
            for (const step of state.selectedDeployment.steps) {
              for (const artifact of step.artifacts) {
                if (artifact.status == "DEPLOYED"){
                  state.deployedArtifacts.push(artifact)
                }
              }
            }
      return state.deployedArtifacts
    },
  },
  actions: {
    updateSelectedDeploymentAction(context, payload) {
      context.commit('updateSelectedDeployment', payload)
    },
    updateSelectedStepAction(context, payload) {
      context.commit('updateSelectedStep', payload)
    },
    updateCurrentStepIndexAction(context, payload) {
      context.commit('updateCurrentStepIndex', payload)
    },
    updateCurrentArtifactIndexAction(context, payload) {
      context.commit('updateCurrentArtifactIndex', payload)
    },
    updateSelectedArtifactAction(context, payload) {
      context.commit('updateSelectedArtifact', payload)
    },
    activateViewMode(context) {
      context.commit('activateView')
    },
    deactivateViewMode(context) {
      context.commit('deactivateView')
    },
    resetDeploymentAction(context){
      context.commit('resetDeployment')
    },
    updateAccountAction(context, payload){
      context.commit('updateAccount', payload)
    },
    addDeployedArtifactsAction(context, payload){
      context.commit('addDeployedArtifacts', payload)
    },
    clearDeployedArtifactsAction(context){
      context.commit('clearDeployedArtifacts')
    }
  },
  modules: {
  }
})
