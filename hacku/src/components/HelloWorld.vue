<template>
    <v-app>
        <v-container class="lighten-5">
            <v-row>
                <v-col>
                    <div class="hello">
                        <h1>Hello {{ name }}!!</h1>
                        <h1>{{ msg }}</h1>

                        <button @click="signOut">Sign out</button>
                    </div>
                </v-col>
            </v-row>

            <v-row>
                <v-col>

                    <div>
                        <h1>New TODO</h1>
                        <div>
                            <ul>
                                <li><input v-model="namee"></li>
                                <li>
                                    <button v-on:click="addTodo">Add</button>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <h1>Index</h1>
                    <table>
                        <thead>
                        <td>name</td>
                        </thead>
                        <tr v-for="todo in this.todos" :key="todo.id">
                            <td>
                                {{ todo.namee }}
                            </td>
                        </tr>
                    </table>

                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>


<!--参考先-->
<!--https://qiita.com/Dchi412/items/e0859e5df65de6f78591-->

<script>
  import firebase from 'firebase'
  import 'firebase/firestore';

  export default {
    name: 'HelloWorld',
    data() {

      return {
        msg: 'Welcome to Your Vue.js App',
        name: firebase.auth().currentUser.email,

        db: null,
        namee: '',
        todos: [],
      }
    },


    created: function () {
      this.db = firebase.firestore()

      var _this = this


      // todos コレクションを監視する
      this.db.collection('todos').onSnapshot(function (querySnapshot) {
        _this.todos = []
        querySnapshot.forEach(function (doc) {
          var data = doc.data()
          data.id = doc.id
          _this.todos.push(data)
        })
      })

    },


    methods: {

      addTodo: function () {
        var _this = this

        // todos コレクションにドキュメントを追加
        this.db.collection('todos').add({
          namee: _this.namee
        })
          .then(function () {
            // 追加に成功したら、name を空にする
            _this.namee = ''
          })
          .catch(function () {
            // エラー時の処理
          })
      },

      signOut: function () {
        firebase.auth().signOut().then(() => {
          this.$router.push('/signin')
        })
      }
    }
  }
</script>

<style scoped>
    /* 省略 */
</style>