<template>
  <div class="view-home">
    <div class="view-home__cover">
      <h1 class="view-home__title">Veja Livros</h1>
      <el-input placeholder="Busque por um livro" v-model="searchParam" class="view-home__input">
        <el-button slot="append" icon="el-icon-search" v-scroll-to="'#table-list'" />
      </el-input>
      <div class="view-home__add-button">
        <el-button type="primary" @click="addBook()" icon="el-icon-plus">Adcionar um Livro</el-button>
      </div>
    </div>
    <el-table
      :data="filteredBooks"
      :stripe="true"
      id="table-list"
      style="width: 100%; cursor: pointer">
      <el-table-column prop="title" label="Titulo" />
      <el-table-column prop="author.name" label="Autor" />
      <el-table-column prop="keywords" label="Palavras Chave" />
      <el-table-column prop="id" label="Ações" width="220">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Ler" placement="bottom">
            <el-button plain @click="readBook(scope.$index)" icon="el-icon-reading" />
          </el-tooltip>
          <el-tooltip effect="dark" content="Editar" placement="bottom">
            <el-button plain @click="editBook(scope.$index)" icon="el-icon-edit" />
          </el-tooltip>
          <el-tooltip effect="dark" content="Apagar" placement="bottom">
            <el-button type="danger" plain @click="removeBook(scope.row.id)" icon="el-icon-delete" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="activeModalTitle"
      :visible.sync="visibleBook"
      :center="true"
      width="90%">
      <span>{{ activeModalText }}</span>
    </el-dialog>
    <el-dialog
      :title="editingTitle"
      :visible.sync="visibleEdit"
      :center="true"
      width="90%">
      <el-form :model="activeBook" :rules="rules" ref="activeBook">
        <el-form-item label="Nome" prop="title">
          <el-input v-model="activeBook.title" />
        </el-form-item>
        <el-form-item label="Autor" prop="author.name">
          <el-input v-model="activeBook.author.name" />
        </el-form-item>
        <el-form-item label="Palavras Chave" prop="keywords">
          <el-input v-model="activeBook.keywords" />
        </el-form-item>
        <el-form-item label="Texto" prop="text">
          <el-input rows="8" type="textarea" v-model="activeBook.text" />
        </el-form-item>
      </el-form>
      <span v-if="activeBook.id !== ''" slot="footer">
        <el-button @click="visibleEdit = false">Cancelar</el-button>
        <el-button @click="confirmEdition" type="primary">Confirmar</el-button>
      </span>
      <span v-else slot="footer">
        <el-button @click="visibleEdit = false">Cancelar</el-button>
        <el-button @click="includeBook" type="primary">Confirmar</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      searchParam: '',
      editingTitle: '',
      activeModalText: '',
      activeModalTitle: '',
      visibleEdit: false,
      visibleBook: false,
      booksList: [],
      filteredBooks: [],
      activeBook: {
        title: '',
        author: { name: '' },
        keywords: '',
        text: '',
        id: ''
      },
      rules: {
        title: [
          { required: true, message: 'Insira um título para o livro', trigger: 'submit' }
        ],
        author: { name: [
          { required: true, message: 'Insira um autor para o livro', trigger: 'submit' }
        ] },
        keywords: [
          { required: true, message: 'insira pelomenos uma palavra chave', trigger: 'submit' }
        ],
        text: [
          { required: true, message: 'Insira um texto', trigger: 'submit' }
        ]
      }
    }
  },
  beforeMount () {
    this.getBooks()
  },
  watch: {
    searchParam (term) {
      this.filterSearch(term)
    }
  },
  methods: {
    getBooks () {
      axios.get('http://34.73.84.212/api/v1/books')
        .then(response => response.data.data)
        .then(books => {
          this.booksList = books
          this.filteredBooks = books
        })
        .catch(error => {
          this.$notify({
            title: 'Ops!',
            message: 'Houve uma falha no servidor, tente novamente mais tarde.',
            type: 'error'
          })
          console.log(error)
        })
    },
    addBook () {
      this.editingTitle = 'Adcionar um novo livro'
      this.activeBook.title = ''
      this.activeBook.author.name = ''
      this.activeBook.keywords = ''
      this.activeBook.text = ''
      this.activeBook.id = ''
      this.visibleEdit = true
    },
    includeBook () {
      this.$refs['activeBook'].validate((valid) => {
        if (valid) {
          delete this.activeBook.id
          axios.post('http://34.73.84.212/api/v1/books', this.activeBook)
            .then(response => {
              this.$notify({
                title: 'Yay!',
                message: 'Livro adcionado com sucesso',
                type: 'success'
              })
              console.log(response)
              this.visibleEdit = false
            })
            .catch(() => {
              this.$notify({
                title: 'Ops!',
                message: 'Houve uma falha no servidor, tente novamente mais tarde',
                type: 'error'
              })
            })
            .finally(() => {
              setTimeout(() => {
                this.getBooks()
              }, 1000)
            })
        } else {
          return false
        }
      })
    },
    editBook (index) {
      this.editingTitle = 'Edição de Livro - ' + this.booksList[index].title
      this.activeBook.title = this.booksList[index].title
      this.activeBook.author.name = this.booksList[index].author.name
      this.activeBook.keywords = this.booksList[index].keywords
      this.activeBook.text = this.booksList[index].text
      this.activeBook.id = this.booksList[index].id
      this.visibleEdit = true
    },
    confirmEdition () {
      this.$confirm('Tem certeza que deseja editar este livro?', 'Espere', {
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar',
        type: 'warning',
        center: true
      }).then(() => {
        this.$refs['activeBook'].validate((valid) => {
          if (valid) {
            axios.put('http://34.73.84.212/api/v1/books/' + this.activeBook.id, this.activeBook)
              .then(() => {
                this.$notify({
                  title: 'Yay!',
                  message: 'Livro editado com sucesso',
                  type: 'success'
                })
                this.visibleEdit = false
              })
              .catch(() => {
                this.$notify({
                  title: 'Ops!',
                  message: 'Houve uma falha no servidor, tente novamente mais tarde',
                  type: 'error'
                })
              })
              .finally(() => {
                setTimeout(() => {
                  this.getBooks()
                }, 1000)
              })
          } else {
            return false
          }
        })
      })
    },
    removeBook (id) {
      this.$confirm('Tem certeza que deseja remover este livro?', 'Espere', {
        confirmButtonText: 'Remover',
        cancelButtonText: 'Cancelar',
        type: 'warning',
        center: true
      }).then(() => {
        axios.delete('http://34.73.84.212/api/v1/books/' + id)
          .then(() => {
            this.$notify({
              title: 'Yay!',
              message: 'Livro removido com sucesso',
              type: 'success'
            })
          })
          .catch(() => {
            this.$notify({
              title: 'Ops!',
              message: 'Houve uma falha no servidor, tente novamente mais tarde',
              type: 'error'
            })
          })
          .finally(() => {
            setTimeout(() => {
              this.getBooks()
            }, 1000)
          })
      })
    },
    readBook (index) {
      this.activeModalTitle = this.booksList[index].title + ' - ' + this.booksList[index].author.name
      this.activeModalText = this.booksList[index].text
      this.visibleBook = true
    },
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
        return (occurrence.title.toLowerCase().includes(term.toLowerCase())) || (occurrence.keywords.toLowerCase().includes(term.toLowerCase())) || (occurrence.author.name.toLowerCase().includes(term.toLowerCase()))
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
  &__add-button {
    // display: flex;
    // position: absolute;
    // top: 20px;
    // right: 40px;
    margin-top: 40px;
  }
}
.el-dialog {
  background-color: #fff !important;
}
</style>
