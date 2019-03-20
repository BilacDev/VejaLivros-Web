<template>
  <div class="view-home">
    <div class="view-home__cover">
      <h1 class="view-home__title">Veja Livros</h1>
      <el-input placeholder="Busque por um livro" v-model="searsch" class="view-home__input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="booksList" stripe style="width: 100%">
      <el-table-column prop="book" label="Livro" />
      <el-table-column prop="author" label="Autor" />
      <el-table-column prop="editor" label="Editora" />
      <el-table-column prop="year" label="Ano" />
    </el-table>
  </div>
</template>

<script>
import ReadBook from '@/components/ReadBook'

export default {
  name: 'home',
  components: {
    ReadBook
  },
  data () {
    return {
      searsch: '',
      booksList: [
        {
          book: 'Um Livro Ai',
          author: 'Pessoa Autora',
          editor: 'SeiLah',
          year: '1998'
        },
        {
          book: 'Algum Outro Livro',
          author: 'Autor Qualquer',
          editor: 'Editora',
          year: '2010'
        },
        {
          book: 'Mais um livro',
          author: 'Algum Autor',
          editor: 'Editora',
          year: '2011'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .view-home {
    &__cover {
      width: 100vw;
      height: 100vh;
      background-image: url('../assets/c1.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items:center;
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
