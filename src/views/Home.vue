<template>
  <div class="view-home">
    <div class="view-home__cover">
      <h1 class="view-home__title">Veja Livros</h1>
      <el-input placeholder="Busque por um livro" v-model="searchParam" class="view-home__input">
        <el-button slot="append" icon="el-icon-search" v-scroll-to="'#table-list'" />
      </el-input>
    </div>
    <el-table :data="filteredBooks" id="table-list" stripe style="width: 100%">
      <el-table-column prop="title" label="Titulo" />
      <el-table-column prop="author.name" label="Autor" />
      <el-table-column prop="created_at" label="Ano" />
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      searchParam: '',
      booksList: [
        {
          title: 'Teste',
          author: { name: 'Autor' },
          created_at: '1999'
        },
        {
          title: 'Historia de um tiozinho',
          author: { name: 'Tiozinho do alem' },
          created_at: '2010'
        },
        {
          title: 'Eu',
          author: { name: 'Minha mae' },
          created_at: '2006'
        },
        {
          title: '50 tons de Valentino',
          author: { name: 'Valentino' },
          created_at: '2019'
        }
      ],
      filteredBooks: []
    }
  },
  mounted () {
    axios
      .get('http://localhost:4000/api/v1/books')
      .then(response => response.data.data)
      .then(books => (this.booksList = books))
      .catch(erro => console.log('Deu merda aqui', erro))
  },
  created () {
    this.filteredBooks = this.booksList.slice(0)
  },
  watch: {
    searchParam (term) {
      this.filterSearch(term)
    }
  },
  methods: {
    filterSearch (term) {
      var allBooks = this.booksList.slice(0)
      if (term) {
        var results = allBooks.filter(this.createFilter(term))
        this.filteredBooks = results
      } else {
        this.filteredBooks = allBooks
      }
    },
    createFilter (term) {
      return (occurrence) => {
        return (occurrence.title.toLowerCase().includes(term.toLowerCase())) || (occurrence.created_at.toLowerCase().includes(term.toLowerCase())) || (occurrence.author.name.toLowerCase().includes(term.toLowerCase()))
      }
    }
  }
}
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
    filter: grayscale(0.3)
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
