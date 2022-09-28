
$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault();

        let valorInput = $("#idPokemon").val();

        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + valorInput,
            success: function (data) {
                /*console.log(data)*/
                let nombre = data.name;
                let imagen = data.sprites.front_default;
                let peso = data.weight;

                $("#pokeInfo").html(
                    `<div class="text-center">
                    <h3>${nombre}</h3>
                    <img src="${imagen}">
                    <h6>peso: ${peso}</h6>
                    </div>`
                );

                let estadisticas = [];

                data.stats.forEach(function (s) {
                    estadisticas.push({
                        label: s.stat.name,
                        y: s.base_stat,
                    });
                });

                let config = {
                    animationEnabled: true,
                    title: {
                        text: "Estadisticas"
                    },
                    axisY: {
                        title: "Valor"
                    },
                    axisX: {
                        title: "Estadistica"
                    },
                    data: [
                        {
                            type: "column",
                            dataPoints: estadisticas,
                        }
                    ],

                }

                let chart = new CanvasJS.Chart("pokeInfoDos", config);

                chart.render();
            },
        });
    });
});