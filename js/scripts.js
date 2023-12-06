function addTR() {
  var newRow = $("#tabla tbody tr:last").clone();
  newRow.find('input, textarea').val('');
  $("#tabla tbody").append(newRow);
}

function deleteTR(button) {
  $(button).closest('tr').remove();
}