function addTR() {
      var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];

      var newTR = table.insertRow(table.rows.length);
      var tdHora = newTR.insertCell(0);
      var tdDescripcion = newTR.insertCell(1);
      var tdDelete = newTR.insertCell(2);

      tdHora.innerHTML = '<input type="time" class="form-control" name="hora[]" required>';
      tdDescripcion.innerHTML = '<textarea class="form-control" name="descripcion[]" required></textarea>';
      tdDelete.innerHTML = '<button type="button" class="btn btn-primary" onclick="deleteTR(this)">Eliminar</button>';
    }

function deleteTR(boton) {
    var row = boton.parentNode.parentNode;
    row.parentNode.removeChild(row);
    }