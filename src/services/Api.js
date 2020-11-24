import {IAGRAM_API_URL} from '../variables'
import axios from 'axios'
import router from '../router'

axios.interceptors.response.use(null, error => {
  switch (error.response.status) {
    case 403:
      router.push('/403')
      break
    case 404:
      router.push('/404')
      break
    case 500:
      console.log(error.response.data.message)
      break
  }
})

class API {
    getAccountByEmail(email){
        return axios.get(IAGRAM_API_URL + '/account/find?email=' + email)
    }
    getAccountById(id){
        return axios.get(IAGRAM_API_URL + '/account/find?id=' + id)
    }
    createAccount(account){
        return axios.post(IAGRAM_API_URL + '/account/', account)
    }
    createAWSCredential(credential){
        return axios.post(IAGRAM_API_URL + '/AWS/credential/', credential)
    }
    createGCPCredential(credential){
        return axios.post(IAGRAM_API_URL + '/GCP/credential/', credential)
    }
    createAZURECredential(credential){
        return axios.post(IAGRAM_API_URL + '/AZURE/credential/', credential)
    }
    createProfile(profile){
        return axios.post(IAGRAM_API_URL + '/profile/', profile)
    }
    updateStepStatus(id, status){
        return fetch(IAGRAM_API_URL + '/step/'+ id + '/status/' + status, {method: 'PATCH'})
    }
    deployArtifact(id, profile){
        return fetch(IAGRAM_API_URL + '/artifact/'+ id + '/deploy', 
        {   
            method: 'PATCH', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(profile)
        })
        //axios.patch(IAGRAM_API_URL + '/artifact/'+ id + '/deploy')
    }
    updateDeploymentStatus(id, status){
        return fetch(IAGRAM_API_URL + '/deployment/'+ id + '/status/' + status, {method: 'PATCH'})
        //axios.patch(IAGRAM_API_URL + '/artifact/'+ id + '/deploy')
    }
    getDeployment(id){
        return fetch(IAGRAM_API_URL + '/deployment/find?id='+ id)
        //axios.patch(IAGRAM_API_URL + '/artifact/'+ id + '/deploy')
    }
}

export default new API()