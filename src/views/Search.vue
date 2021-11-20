<template>
  <navbar></navbar>
  <div class="mod_section">
    <search-bar></search-bar>
    <div class="mod_res">
      <search-type></search-type>
      <search-result></search-result>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/navbar";
import {search} from "@/plugin/axios";
import searchBar from "@/components/Search/searchBar";
import searchType from "@/components/Search/searchType";
import SearchResult from "@/components/Search/searchResult";
export default {
  name: "Search",
  components: {
    SearchResult,
    searchBar,
    searchType,
    Navbar,
  }
}
</script>

<style scoped>
.mod_section{
  min-width: 1300px;
  /*height: 1300px;*/
  /*background-image: linear-gradient(#f2f2f2,#fafafa);*/
  /*background-color: rosybrown;*/
  position: relative;
}
</style>