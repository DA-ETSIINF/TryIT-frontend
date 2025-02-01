<template>
    <div>
        <div class="grid">
            
            <div class="timer_class">
                <table>
                    <thead>
                        <tr>
                            <td colspan="7">
                                <img class="tryit-logo" src="/img/imagotipo_claro_2.png"/>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="7">
                                <h2>  ¡Ya ha empezado la cuenta atrás!  </h2>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="time">{{timer.days}}</div>
                            </td>
                            <td>
                                <p>:</p>
                            </td>
                            <td>
                                <div class="time">{{timer.hours}}</div> 
                            </td>
                            <td>
                                <p>:</p>
                            </td>
                            <td>
                                <div class="time">{{timer.minutes}}</div>
                            </td>
                            <td>
                                <p>:</p>
                            </td>
                            <td>
                                <div class="time">{{timer.seconds}}</div>
                            </td>
                        </tr>
                    </tbody> 
                    <tfoot>
                        <!-- <tr>
                            <td>
                                <p>Días</p>
                            </td>
                            <td>
                                <p>Horas</p>
                            </td>
                            <td>
                                <p>Minutos</p>
                            </td>
                            <td>
                                <p>Segundos</p>
                            </td>
                            
                        </tr> -->
                        <td colspan="7">
                            <h2>  17 al 22 de Marzo de 2025  </h2>
                        </td>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');

@font-face {
    font-family: 'Lovelo-Black';
    src: local('Lovelo-Black'), url('https://c.webfontfree.com/c.js?f=Lovelo-Black') format('truetype');
}

/* Usar la fuente en el CSS */
.timer_class h2 {
    font-family: 'Lovelo-Black', sans-serif;
    font-weight: normal;
}


.tryit-logo {
    height: auto;
    width: 20vw;
}

table {
    width: 100%;  /* Asegura que la tabla ocupe todo el ancho disponible */
    border-spacing: 0; /* Elimina espacio entre las celdas */
    border-collapse: collapse; /* Asegura que las celdas estén pegadas */
}


td {
    text-align: center;  /* Centra el contenido horizontalmente */
    vertical-align: middle;  /* Centra el contenido verticalmente */
    margin: 0;
}

.grid {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    box-shadow: 0px 0px 15px white;
    outline: solid rgba(255,255,255,0.5);
    background-color: rgba(20,20,20,0.3);
}

.time {
    font-size: 8vw;
    font-family: 'Fira Code', monoespace;
    font-weight: 700;
    margin: 0;
    padding: 0;
    line-height: 1;
    display: inline-block;
}

.timer_intro {
    text-align: center;
    font-size: 5vw;
    color: white;
}

.timer_class {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 5px;
    justify-content: center;
    align-items: center;
    max-height: auto;
    max-width: 100%;
}

.timer_class *{
    margin: auto;
    color: var(--primary-9);
    border: 50px;
    border-color: rgba(82, 78, 78, 0.75);
    padding-top: 0.2vw;
    padding-right: 0.5vw;
    padding-bottom: 0.2vw;
    padding-left: 0.5vw;
    text-align: center; 
}

.timer_class p {
    font-size: 8vw; /* Tamaño coherente con los números */
    margin: 0;      /* Elimina los márgenes */
    padding: 0;     /* Elimina el relleno */
    line-height: 1; /* Ajusta la altura de línea para que sea consistente */
    display: inline-block; /* Asegura que los dos puntos se alineen con los números */
}

.timer_class h2 {
    font-size: 2.5vw;
    font-family: 'Lovelo-Black', sans-serif;
    font-weight: 700;
    color: var(--primary-9);
    text-shadow: 1px 1px 1px rgb(0, 0, 0);
}

</style>

<script lang="ts">
import {
  TimerType
} from "../../types/components/TimerType";
import Vue from "vue";
export default  Vue.extend({
    data()  {
        return {
            // Nueva fecha de inicio: 17 de marzo de 2025 a las 11:00 AM
            secondsLeft: (new Date("2025-03-17T11:00:00+01:00").getTime() - Date.now()) / 1000,
        };
    },
    computed:   {
        timer(): TimerType {
            let secs = this.secondsLeft;
            return this.formatTime(secs)
        }
    },
    methods:    {
        formatTime(seconds): TimerType {
            if(seconds > 0) {
                setTimeout(() => {
                    this.secondsLeft--;
                }, 1000)
            }
            let days: number;
            let time: TimerType = new TimerType(seconds);
           
            return time; //.substr(11, 8);
        }
    }

});
</script>