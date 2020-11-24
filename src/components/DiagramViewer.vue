<template>
  <v-card>
    <v-subheader>Infrastructure as Diagram</v-subheader>
    <div
      class="mxgraph"
      style="margin: 0 auto;max-width:100%;border:1px solid transparent;box-sizing: border-box;"
      data-mxgraph='{"highlight":"#0000ff","nav":true,"resize":true,"toolbar":"zoom layers lightbox","edit":"_blank","xml":"&lt;mxfile host=\"app.diagrams.net\" modified=\"2020-11-15T13:14:51.632Z\" agent=\"5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36\" etag=\"YRtQxvNA_BFb7ZjQ5P96\" version=\"13.9.2\" type=\"device\"&gt;&lt;diagram id=\"q0XS5lSBZyKJjBOos1fR\" name=\"Page-1\"&gt;7Vrbkto4EP0aHoeyJN94BOaS1M5mqZDsVuUlJWwB2rEtryxz2a9fyZaNbzjsBCZMMjXUFGrJ3W31Oe1jFQM0DXcPHMfr35lPggE0/N0A3Q4gHJm2/K8M+9xgF4YVp35uAgfDnP5LtNHQ1pT6JKktFIwFgsZ1o8eiiHiiZsOcs2192ZIF9agxXpGWYe7hoG39i/pinVtdyzjY3xG6WheRgaFnQlws1oZkjX22rZjQ3QBNOWMi/xbupiRQe1fsS37d/ZFZ94/xQ7gAwcNsNntk6MsiuHNuYB5qg4NU5/85ElQExJfWR7wnvEibk0h0hGGLv9UuQiPAC1nIbMFHsqIsyi+McKgdk/TGkz44Dm70HnGSsJR7ep5XrurNGZR7Ud5jIvbF/seMRiKroTWRH5ns1BhYcmaqRkNoNQzNsVM3gPZI+agbmmOnbgBN96ARHzQTrBhao5p7oxHfqCQoP2jCUhHQiExLtBvSuOLYp7IWUxYwLm0Ri+TuTdYiVBUE8ut2TQWZxzgrzlYSVdqWLBKabwAWY73xyqvEa6y+h7uVYvYQbxNzuOIsjbOQ7yXjOme/6spLD4KzJ1JkNYAImM7dZKxi0SBoZLshXFDJu3FAV8qxYCoO1qOALIXyKG+BRqvHbHSLDJ12VwgfJ2vi6/tvo76XPjIVsqvwX6PzgbCQCL6XS/Ssqbmtm1tB9e2hU4xcbVtXuoRpayPW3WlVej5QUX7RhCiGmpxHiTreYCqHNKBC5fhFbWwPa70u2uKKj4ODXgKbvQTuKPVxXNSK1o2IJkyP1f9SJXeMes0BaBcdGh1Fh+41FH1xpqJbv1TRTXhC0cHVFh2fqejolyo6GJ3CdOvFiv7nbNpVxw3lIsXBByK2jD9pNUx9PgmY91SI6WH2J4MAuwkUnyxxGogTym+/KbWfS6ltYq+LpNB0XWBeVKaNxxNn4lb7gHFJJjsNJqM2kx2rq31bF2HyPF1ERHSROanMHCga7vMrwHF2g4zd0Dzlhaufx68BuHqbOrDrOiMwsi+K3TLEi2AXNvWm08Zu+aSqYrc0nhm7xEt5LjvySnWgeEk52WIFrDqOxTpZIaQx6pPE4zQW2buimv1EEhWrEuDhEIBGC5ZG/sc0KE6D1GPGmSw5C2eMy4THat00Ox9qGGLOBPOYvIHxANr/pOrEZSK8+DDI15W8StRK6b6cd82hZQ1tZ2hL7twjWLlSNnsna/lZmpI8XXkW0/28NHp5eYq8ur1FlvLxPEVVXn0xLKM6lktsV7GMurCMLoLlLux6LIxTQT4wvyWpaZQIHHlEt+EQe2vZKN+H5REiDumNYWApCr2FSwzbQ56pvTyRfdHLfyP7moNP+7jgBxyG1OPsFLD0H5t1NvFGueXfvXJwrLlXAafQ4do2QC3U6cW1Xlig71Ft9YwlVJN8wYRg4Tc7sXpvIbz+ePnWowQncX6jS7pTeUwyOUr43YbkqhQce94I+LUo7CWh74A69E3Qgr7ptpFf2K5DgMDjAgSeLkDgM7D7JkB+lAAx0ZUJkGdiFx3HLvof2IVv2H092HWK45lrwe73imfX7RHP6OXU83z+7nT1DIFWzyr7S6ln52cXzw6qYxl2HEdenXhuS1xUlbhtbY3OpK17seK+aeczaWf0EtrZcew68q0fqZ1Pwn0b2PBMwP6el8bRG+5f0zujBRrHJS/2ziiHhx8mZUsrv+5Cd/8B&lt;/diagram&gt;&lt;/mxfile&gt;"}'
    ></div>
  </v-card>
</template>

<script>
export default {
  computed: {
    deployment() {
      return this.$store.state.selectedDeployment;
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
