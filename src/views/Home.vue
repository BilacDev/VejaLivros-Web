<template>
  <div class="view-home">
    <div class="view-home__cover">
      <h1 class="view-home__title">Veja Livros</h1>
      <el-input placeholder="Busque por um livro" v-model="searchParam" @change="search" class="view-home__input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="booksList" id="table-list" stripe style="width: 100%">
      <el-table-column prop="title" label="Livro"/>
      <el-table-column prop="author.name" label="Autor"/>
      <el-table-column prop="created_at" label="Ano"/>
    </el-table>
  </div>
</template>

<script>
import ReadBook from "@/components/ReadBook";
import axios from "axios";

export default {
  name: "home",
  components: {
    ReadBook
  },
  data() {
    return {
      searchParam: "",
      booksList: []
    };
  },
  mounted() {
    axios
      .get("http://localhost:4000/api/v1/books")
      .then(response => response.data.data)
      .then(books => (this.booksList = books))
      .catch(erro => console.log("Deu merda aqui", erro));
  },
  methods: {
    search() {
      console.log('entrou')
      // Declare variables
      const paramFormatted = this.searchParam.toUpperCase()
      const table = document.getElementById("table-list");
      const tr = table.getElementsByTagName("tr");

      // Loop through all table rows, and hide those who don't match the search query
      for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
};
</script>

<style lang="scss">
.view-home {
  &__cover {
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/c1.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  &__title {
    color: white;
    font-weight: bold;
    font-size: 100px;
    line-height: 100px;
    text-shadow: 0px 0px 20px rgba(150, 150, 150, 1);
  }
  &__input {
    margin-top: 40px;
    width: 600px !important;
    border-radius: 8px !important;
    box-shadow: 0px 0px 20px 0px rgba(150, 150, 150, 1);
  }
}
</style>
