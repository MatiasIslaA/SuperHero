let info;

$(document).ready(function () {
  let heroNumber = document.querySelector(".super-hero-number");
  let heroData = (num) => {
    event.preventDefault();
    $.ajax({
      type: "GET",
      url: `https://superheroapi.com/api/10216648992535838/${num}`,
      dataType: "JSON",
      success: function (data) {
        info = data;
      },
      error: function (data) {
        console.log("error");
      },
      async: true,
    });
    return info;
  };
  let heroBox = () => {
    $(".selectedHero").html(`<div class="card mb-3" style="max-width: 100%;">
    <div class="card-group">
    <div class="card">
    <div class="card img-fluid">

        <img src="${info.image.url}" class="card-img-top" alt="..." height="300px" style="object-fit:contain"></div>
        <div class="card-body">
          <h5 class="card-title">Nombre: ${info.name}</h5>
          <p class="card-text">Conexiones: ${info.connections.relatives}</p>
          <p class="card-text">Ocupación: ${info.work.occupation}</p>
          <p class="card-text">Primera aparición: ${info.biography["first-appearance"]}</p>
          <p class="card-text">Altura: ${info.appearance.height[1]}</p>
          <p class="card-text">Peso: ${info.appearance.weight[1]}</p>
        </div>
      </div>
      <div class="card">
      <div class="card-body">
        <div id="chartContainer" style="height: 300px; width: 100%"></div>
      </div>
    </div>
    </div>
  </div>`);
  };
  $(".btn-submit").click(function () {
    heroData(heroNumber.value);
    setTimeout(function () {
      heroBox();
      var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
          text: "Estadísticas de poder",
        },
        data: [
          {
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
              { y: info.powerstats.combat, label: "Combat" },
              { y: info.powerstats.durability, label: "Durability" },
              { y: info.powerstats.intelligence, label: "Intelligence" },
              { y: info.powerstats.power, label: "Power" },
              { y: info.powerstats.speed, label: "Speed" },
              { y: info.powerstats.strength, label: "Strength" },
            ],
          },
        ],
      });
      chart.render();
    }, 1500);
  });
});
