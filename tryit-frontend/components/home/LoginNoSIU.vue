<template>
    <v-dialog
      v-model="isLOGINVisible"
      max-width="600px"
    > 
  
      <v-card>

        <v-alert
        v-model="error_alert"
        type="error"
        close-text="Cerrar"
        color="red"
        dismissible
        >
        Error al iniciar sesión o registrarse. Contacta a Delegación de Alumnos del centro.
        </v-alert>

        <v-alert
        v-model="error_field_empty"
        type="error"
        close-text="Cerrar"
        color="red"
        dismissible
        >
        Por favor rellena todos los campos
        </v-alert>

        <v-alert
        v-model="error_field_invalid"
        type="error"
        close-text="Cerrar"
        color="red"
        dismissible
        >
        Por favor rellena los campos correctamente
        </v-alert>
        
        <v-row 
          align="center"
          justify="space-around"
          class="mt-5"
        >
        
        <v-card-text>
        <v-form ref="form" v-model="isValid">
          <v-text-field
            v-model="email"
            label="Correo Electrónico"
            type="email"
            :rules="[rules.required, rules.email, rules.noUpm]"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            :rules="[rules.required, rules.min]"
            required
          ></v-text-field>
        </v-form>

        <v-card-actions>
        <v-spacer></v-spacer>
        <div>
            <v-btn color="primary" @click="submitFormLogin()">
            "Iniciar Sesión"
            </v-btn>
            <v-btn color="primary" @click="submitFormRegister()">
            "Registrarse"
            </v-btn>
        </div>
        <v-spacer></v-spacer>
      </v-card-actions>
      </v-card-text>


        </v-row>
      </v-card>
      <v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                dark
                rounded
                x-large
                color="close"
                @click="hideDialog"
              >
                <v-icon 
                  left
                  dark
                  x-large
                  color="white"
                  class="mx-3"
                >
                  <!-- mdi-information-outline -->
                  mdi-close
                </v-icon>
  
                Cerrar
              </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </template>
  
  <script>
  
  
  export default {
    data () {
      return {
        isLOGINVisible: false,
        isHidden: true,
        isValid: undefined,
        result: null,
        error_alert: false,
        error_field_empty: false,
        error_field_invalid: false,
        email: "",
        password: "",
        rules: {
            required: (v) => !!v || "Campo obligatorio",
            email: (v) => /.+@.+\..+/.test(v) || "Correo inválido",
            noUpm: (v) => !v.endsWith("upm.es") || "Esto es solo para usuarios externos a la upm",
            min: (v) => (v && v.length >= 6) || "Mínimo 6 caracteres",
        },
      }
    },
  
    methods: {
      
      hideDialog()  {
          this.isLOGINVisible = false
      },
  
      resetValidationState () {
        this.isValid = undefined
      },

      async submitFormLogin() {
        try {

            this.error_field_empty = false;
            this.error_field_invalid = false;
            this.error_alert = false;

            var data = {
                "email":this.email,
                "password":this.password,
            }

            const response = await this.$axios.post(`${process.env.api}/api/editions/loginexternal`, data);

            return response.data; // Return response data if needed
        } catch (error) {
            console.error("Login failed:", error);
            if(this.email == "" || this.password == ""){
                this.error_field_empty = true;
            }
            else if(this.rules.email(this.email) !== true || this.rules.noUpm(this.email) !== true || this.rules.min(this.password) !== true){
                this.error_field_invalid = true;
            }
            else{
                this.error_alert = true;
            }
        }
      },

      async submitFormRegister() {
        try {

            this.error_field_empty = false;
            this.error_field_invalid = false;
            this.error_alert = false;

            var data = {
                "email":this.email,
                "password":this.password,
            }

            const response = await this.$axios.post(`${process.env.api}/api/editions/registerexternal`, data);

            return response.data; // Return response data if needed
        } catch (error) {
            console.error("Login failed:", error);
            if(this.email == "" || this.password == ""){
                this.error_field_empty = true;
            }
            else if(this.rules.email(this.email) !== true || this.rules.noUpm(this.email) !== true || this.rules.min(this.password) !== true){
                this.error_field_invalid = true;
            }
            else{
                this.error_alert = true;
            }
        }
      },
  
      timeout (ms) {
        return new Promise(resolve => {
          window.setTimeout(resolve, ms)
        })
      },
    },

    created() {
      this.$nuxt.$on("toggleLoginNoSIU", () => {
        this.isLOGINVisible = !this.isLOGINVisible
      })
    }
  }
  </script>
  
  <style scoped>
  </style>