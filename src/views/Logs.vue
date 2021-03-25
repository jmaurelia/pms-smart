<template>
  <b-container class="py-3">
    Lista: {{ lista }}
    <b-row>
      <b-col>
        <b-table striped hover :items="items"></b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import * as firebase from "@/firebase";

export default {
  data() {
    return {
      items: [],
      lista: [],
    };
  },
  async mounted() {
    var ctm = [];
    await firebase.db
      .collection("logs").onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.data());
        });
      });
  },
};
</script>