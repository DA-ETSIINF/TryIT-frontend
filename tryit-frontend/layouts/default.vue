<template>
  <v-app light class="app" :style="{ background: $vuetify.theme.themes.light.background }">
    <v-app-bar app elevate-on-scroll fixed src="/img/Imagotipo_PNG_Blanco_2.png" color="primary">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" contain></v-img>
      </template>

      <!-- Espaciador para pantallas grandes -->
      <v-spacer class="d-none d-md-flex"></v-spacer>

      <!-- Redes Sociales (debajo en móvil, a la derecha en escritorio) -->
      <v-row class="d-none d-md-flex justify-center justify-md-end w-100 mt-3 mt-md-0">
        <v-btn icon target="_blank" href="https://twitter.com/tryit_upm" class="white--text">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn icon target="_blank" href="mailto:tryit.da@fi.upm.es" class="white--text">
          <v-icon>mdi-email</v-icon>
        </v-btn>
        <v-btn icon target="_blank" href="https://github.com/DA-ETSIINF/" class="white--text">
          <v-icon>mdi-github</v-icon>
        </v-btn>
        <v-btn icon target="_blank" href="https://www.instagram.com/tryit_upm/" class="white--text">
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
        <v-btn icon target="_blank" href="https://www.linkedin.com/company/tryit-upm/" class="white--text">
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
      </v-row>



      <template 
          v-slot:extension
        >
          <v-tabs
            fixed-tabs
            optional
            class="mt-15"
            background-color="primary"
            hide-slider
            dark
          >
          <!--
            <v-tab
              @click="launchViewEcts()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-cash-multiple
              </v-icon>

              CONSULTA CRÉDITOS
            </v-tab>
            -->
            <v-tab
              v-if="hasTicket()"
              @click="launchEvViewer()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-view-list
              </v-icon>

              Mis charlas
            </v-tab>
            <v-tab
                v-if="!hasTicket()"
              @click="launchTicket()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-ticket-confirmation
              </v-icon>

              ENTRADAS
            </v-tab>
            <v-tab
              @click="launchTimeline()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-calendar
              </v-icon>

              HORARIOS
            </v-tab>
            <v-tab
              @click="launchTournaments()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-trophy
              </v-icon>

              TORNEOS
            </v-tab>

            <v-tab
              @click="launchFAQ()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-frequently-asked-questions
              </v-icon>

              FAQ
            </v-tab>
            
            <v-tab
              v-if="checkAdmin() || checkScanner()"
              @click="launchQRReader()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-qrcode-scan
              </v-icon>
              Escanear Entradas
            </v-tab>
            <v-tab
              v-if="checkAdmin()"
              @click="launchLottery()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-clover
              </v-icon>
              Sorteo
            </v-tab>
            
            <v-tab v-if="!checkLogin()" @click="menuOpen = !menuOpen">
              <v-menu v-model="menuOpen" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">
                    <v-icon left dark color="white" class="mx-3">
                      mdi-login
                    </v-icon>
                    Iniciar Sesión
                  </span>
                </template>

                <v-list>
                  <v-list-item @click="launchLogin()">
                    <v-list-item-title>Usuario UPM</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="launchLoginNoSIU()">
                    <v-list-item-title>Usuario NO UPM</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-tab>
            <v-tab
              v-if="checkLogin()"
              @click="launchLogout()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-logout
              </v-icon>

              LOGOUT
            </v-tab>
          </v-tabs>
        </template>
    </v-app-bar>

    <main>
      <v-container app class="container" fluid>
        <nuxt />
        <DialButton class="dbut"></DialButton>
      </v-container>
    </main>

    <v-footer color="secondary">
      <v-spacer></v-spacer>
      <v-btn>&copy; {{ new Date().getFullYear() }}</v-btn>
      <v-spacer></v-spacer>
    </v-footer>

    <v-footer color="secondary">
      <v-spacer></v-spacer>
      <p padding-bottom="0px" style="margin-bottom:0px; padding-bottom:0px" class="white--text">
        &nbsp;&nbsp;Contacto&nbsp;&nbsp;
      </p>
      <v-spacer></v-spacer>
    </v-footer>

    <v-footer color="secondary">
      <v-spacer></v-spacer>
      <v-btn fab target="_blank" href="https://twitter.com/tryit_upm" class="contact-button">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn fab target="_blank" href="mailto:tryit.da@fi.upm.es" class="contact-button">
        <v-icon>mdi-email</v-icon>
      </v-btn>
      <v-btn fab target="_blank" href="https://github.com/DA-ETSIINF/" class="contact-button">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-btn fab target="_blank" href="https://www.instagram.com/tryit_upm/" class="contact-button">
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-btn fab target="_blank" href="https://www.linkedin.com/company/tryit-upm/" class="contact-button">
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script lang="js">
import { Component, Vue } from "nuxt-property-decorator";
import * as Components from "../components";

@Component({
  components: {
    DialButton: Components.DialButton,
    PopupTicket: Components.PopupTicket,
    PopupLogin: Components.PopupLogin,
    Timeline: Components.Timeline,
    QRReader: Components.QRReader,
    EventsViwer: Components.EventsViewer,
    FAQ: Components.FAQ,
  }
})
export default class extends Vue {

  data() {
    return {
      menuOpen: false, // Add this state to track the menu open/close status
    };
  }
  

  launchViewEcts()    {
      this.$nuxt.$emit("toggleViewEcts")
  }
  launchTicket() {
    this.$nuxt.$emit("toggleTicketForm");
  }
  launchTimeline() {
    this.$nuxt.$emit("toggleTimeline");
  }
  launchTournaments() {
    this.$nuxt.$emit("toggleTournaments");
  }
  launchFAQ() {
    this.$nuxt.$emit("toggleFAQ");
  }
  launchLogin() {
    this.$auth.loginWith("SIU");
  }
  launchQRReader() {
    this.$nuxt.$emit("toggleQRReader");
  }
  launchLoginNoSIU()  {
      this.$nuxt.$emit("toggleLogin")
  }
  launchLottery() {
    this.$nuxt.$emit("toggleLottery");
  }
  launchEvViewer() {
    this.$nuxt.$emit("toggleEvViewer");
  }
  launchLogout() {
    this.$auth.logout();
  }
  checkLogin() {
    return this.$auth.loggedIn;
  }
  checkAdmin() {
    return this.$auth.loggedIn && this.$auth.user.isadmin;
  }
  checkScanner() {
    return this.$auth.loggedIn && this.$auth.user.isscanner;
  }
  hasTicket() {
    return this.$auth.loggedIn && this.$auth.user.ticket_id !== "undefined";
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.v-toolbar__title {
  font-size: 100% !important;
}

.contact-button {
  margin-right: 5px;
}
</style>
