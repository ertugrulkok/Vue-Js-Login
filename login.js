const app = Vue.createApp({
  data() {
    return {
      persons: [
        {
          name: "USER 1",
          username: "user1",
          password: "puser1",
          email: "user1@mail.de",
          admin: true,
        },
        {
          name: "USER 2",
          username: "user2",
          password: "puser2",
          email: "user2@mail.de",
        },
        {
          name: "USER 3",
          username: "user3",
          password: "puser3",
          email: "user3@mail.de",
          admin: false,
        },
        {
          name: "USER 4",
          username: "user4",
          password: "puser4",
          email: "user4@mail.de",
          admin: false,
        },
      ],

      // input fields
      nameInput: "",
      usernameInput: "",
      passwordInput: "",
      usermailInput: "",
      admin: null,
      // display Variables
      displayAdmin: false,
      displayUsername: "",
      displayEmail: "",
      displayName: "",
      displayPassword: "",
      invalidMessage: "",
      displayLogin: false,
      // checkbox
      showDetails: false,
      showList: true,
    };
  },
  methods: {
    registration() {
      for (var i = 0; i < this.persons.length; i++) {
        if (
          this.persons[i].username == this.usernameInput ||
          this.persons[i].email == this.usermailInput
        ) {
          this.usermailInput = "";
          this.usernameInput = "";
          this.invalidMessage = "Der Username existiert bereits";
          return;
        } else {
          this.invalidMessage = "User erfolgreich registriert";
        }
      }

      // außerhalb der for schleife
      const newUser = new User(
        this.nameInput,
        this.usernameInput,
        this.passwordInput,
        this.usermailInput,
        this.admin
      );
      this.sendMessage();
      this.persons.push(newUser);
    },
    submitForm(event) {
      // event.preventDefault(); // reiner JS Code 2.Möglichkeit mit nur JS
      // alert("Daten wurden übergeben");
    },
    login() {
      for (var i = 0; i < this.persons.length; i++) {
        if (
          this.persons[i].username == this.usernameInput &&
          this.persons[i].password == this.passwordInput
        ) {
          this.displayName = this.persons[i].name;
          this.displayEmail = this.persons[i].email;
          this.displayPassword = this.persons[i].password;
          this.displayUsername = this.persons[i].username;
          this.displayAdmin = this.persons[i].admin;
          this.displayLogin = true;
          this.invalidMessage = "Login erfolgreich";
          return;
        } else {
          this.displayLogin = false;
          this.displayAdmin = false;
          this.invalidMessage = "Login fehlgeschlagen";
          // variable erstellen mit true false für user box
        }
      }
    },
    sendMessage() {
      // e.preventDefault();

      const emailFrom = "metehan905@gmail.com";
      const mailTo = this.usermailInput;
      const msg = "Deine Registrierung war erfolgreich";

      Email.send({
        SecureToken: "d34e93b7-cb59-4ed0-8f7b-6cc67b8d03bb",
        To: mailTo,
        From: emailFrom,
        Subject: "Registrierung",
        Body:
          msg +
          "Ihre Daten sind: Username:" +
          this.usernameInput +
          "Passwort: " +
          this.passwordInput,
      }).then((message) => alert(message));
    },
  },
  computed: {},
  watch: {
    persons: {
      handler(value) {
        localStorage.persons = JSON.stringify(value);
      },
      deep: true
    },
  },
  mounted() {
    if (localStorage.persons) {
      this.persons = JSON.parse(localStorage.persons);
    }
  },
});

app.mount("#app");

function User(name, username, password, mail, admin) {
  this.name = name;
  this.username = username;
  this.password = password;
  this.mail = mail;
  this.admin = admin;
}


